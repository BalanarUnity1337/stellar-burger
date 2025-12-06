import { Tab, Preloader } from '@krgaa/react-developer-burger-ui-components';
import { throttle } from 'lodash-es';
import { useState, useCallback, useMemo, useRef, useEffect } from 'react';

import { BurgerIngredientsSection } from '@components/burger-ingredients/burger-ingredients-section/burger-ingredients-section.tsx';
import { useGetIngredientsQuery } from '@services/store/api';

import type { TIngredient, TIngredientType } from '@shared/types/entities.ts';

import styles from './burger-ingredients.module.css';

type TSections = Record<TIngredientType, TIngredient[]>;

const sectionTitles: Record<TIngredientType, string> = {
  bun: 'Булки',
  sauce: 'Соусы',
  main: 'Начинки',
};

export const BurgerIngredients = (): React.JSX.Element => {
  const tabsRef = useRef<HTMLElement | null>(null);
  const headersRefs = useRef<
    Partial<Record<TIngredientType, HTMLHeadingElement | null>>
  >({});

  const [activeTab, setActiveTab] = useState<TIngredientType>('bun');

  const { data: ingredients, isLoading, isSuccess, isError } = useGetIngredientsQuery();

  const setHeaderRef = useCallback(
    (key: TIngredientType, headerRef: HTMLHeadingElement) => {
      headersRefs.current[key] = headerRef;
    },
    []
  );

  const handleTabClick = useCallback((tabName: TIngredientType): void => {
    setActiveTab(tabName);

    headersRefs.current[tabName]?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'start',
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (tabsRef.current == null) {
      return;
    }

    const tabsBottom = tabsRef.current.getBoundingClientRect().bottom;

    const closestHeader = {
      key: null as TIngredientType | null,
      distance: Infinity,
    };

    (Object.keys(headersRefs.current) as TIngredientType[]).forEach((key) => {
      const header = headersRefs.current[key];

      if (header != null) {
        const distance = Math.abs(tabsBottom - header.getBoundingClientRect().top);

        if (distance < closestHeader.distance) {
          closestHeader.key = key;
          closestHeader.distance = distance;
        }
      }
    });

    if (closestHeader.key != null) {
      setActiveTab(() => closestHeader.key!);
    }
  }, []);

  const throttledHandleScroll = useRef(throttle(handleScroll, 100)).current;

  useEffect(() => {
    return (): void => {
      throttledHandleScroll.cancel();
    };
  }, []);

  const sections: TSections = useMemo(
    () =>
      (ingredients ?? []).reduce((acc, ingredient) => {
        acc[ingredient.type] = [...(acc[ingredient.type] ?? []), ingredient];

        return acc;
      }, {} as TSections),
    [ingredients]
  );

  const content = useMemo(() => {
    if (isLoading) {
      return <Preloader />;
    }

    if (isError) {
      return (
        <p className={`text text_type_main-large mt-20`}>
          Произошла ошибка при загрузке ингредиентов
        </p>
      );
    }

    if (isSuccess && ingredients?.length > 0) {
      return (
        <>
          <nav ref={tabsRef}>
            <ul className={styles.menu}>
              {(Object.keys(sections) as TIngredientType[]).map((tabName) => (
                <li key={tabName}>
                  <Tab
                    value={tabName}
                    active={tabName === activeTab}
                    onClick={handleTabClick as (value: string) => void}
                  >
                    {sectionTitles[tabName]}
                  </Tab>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className={`pt-10 custom-scroll ${styles.sections}`}
            onScroll={throttledHandleScroll}
          >
            {(Object.keys(sections) as TIngredientType[]).map((key) => (
              <BurgerIngredientsSection
                key={key}
                title={sectionTitles[key]}
                items={sections[key]}
                setHeaderRef={setHeaderRef}
                headerId={key}
              />
            ))}
          </div>
        </>
      );
    }
  }, [sections, isLoading, isSuccess, isError, activeTab]);

  return <section className={styles.burger_ingredients}>{content}</section>;
};
