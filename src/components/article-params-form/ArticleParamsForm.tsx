import React, { MutableRefObject } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

import { useClickAway } from '@uidotdev/usehooks';

import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from '../radio-group';
import { Select } from '../select';
import { Separator } from '../separator';
import { Text } from '../text';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

export type AppStateProps = {
	appState: ArticleStateType;
	setAppState: (state: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ appState, setAppState }: AppStateProps) => {
	const [isOpenModal, setIsOpenModal] = React.useState(false);

	const ref: MutableRefObject<HTMLElement> | null = useClickAway(() => {
		setIsOpenModal(false);
	});

	const [formState, setFormState] = React.useState<ArticleStateType>(appState);

	const handleSubmitForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setAppState(formState);
		setIsOpenModal(false);
	};

	const handleResetForm = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setAppState(defaultArticleState);
		setIsOpenModal(false);
		setFormState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpenModal={isOpenModal}
				onClick={() => setIsOpenModal(!isOpenModal)}
			/>
			<aside
				className={clsx(styles.container, isOpenModal && styles.container_open)}
				ref={ref}>
				<form
					className={styles.form}
					onSubmit={handleSubmitForm}
					onReset={handleResetForm}>
					<Text weight={800} uppercase size={31} as='h2'>
						Задайте параметры
					</Text>
					<Select
						title='Шрифт'
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						onChange={(option) =>
							setFormState({ ...formState, fontFamilyOption: option })
						}
					/>
					<RadioGroup
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						onChange={(option) =>
							setFormState({ ...formState, fontSizeOption: option })
						}
						name='Размер шрифта'
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={formState.fontColor}
						onChange={(option) =>
							setFormState({ ...formState, fontColor: option })
						}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={formState.backgroundColor}
						onChange={(option) =>
							setFormState({ ...formState, backgroundColor: option })
						}
					/>
					<Select
						title='Ширина контента'
						options={contentWidthArr}
						selected={formState.contentWidth}
						onChange={(option) =>
							setFormState({ ...formState, contentWidth: option })
						}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
