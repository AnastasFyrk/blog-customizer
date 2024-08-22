import arrow from 'src/images/arrow.svg';
import styles from './ArrowButton.module.scss';
import clsx from 'clsx';
/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

export type ArrowButtonProps = {
	isOpenModal: boolean;
	onClick: () => void;
};

export const ArrowButton = ({isOpenModal, onClick}: ArrowButtonProps): JSX.Element => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, isOpenModal && styles.container_open)}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, isOpenModal && styles.arrow_open)}
			/>
		</div>
	);
};
