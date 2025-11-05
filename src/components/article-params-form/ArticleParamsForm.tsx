import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useEffect } from 'react';
import { Option } from 'src/ui/radio-group/Option';
import { Select } from 'src/ui/select';
import { Separator } from 'src/ui/separator';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import { useOverlayClick } from '../use-overlay-click/useOverlayClick';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

export type ArticleState = {
	fontFamilyOption: OptionType;
	fontSizeOption: OptionType;
	fontColor: OptionType;
	contentWidth: OptionType;
	backgroundColor: OptionType;
};

type ArticleParamsFormProps = {
	currentState: ArticleState;
	onApply: (updatedValues: Partial<ArticleState>) => void;
};
export const ArticleParamsForm = ({
	currentState,
	onApply,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);

	const overlayRef = useOverlayClick(() => {
		setIsOpen(false);
	});

	const [fontFamily, setFontFamily] = useState(currentState.fontFamilyOption);
	const [fontSize, setFontSize] = useState(currentState.fontSizeOption);
	const [fontColor, setFontColor] = useState(currentState.fontColor);
	const [bgColor, setBgColor] = useState(currentState.backgroundColor);
	const [contentWidth, setContentWidth] = useState(currentState.contentWidth);

	const toggle = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		setFontFamily(currentState.fontFamilyOption);
		setFontSize(currentState.fontSizeOption);
		setFontColor(currentState.fontColor);
		setBgColor(currentState.backgroundColor);
		setContentWidth(currentState.contentWidth);
	}, [currentState]);

	const applyEdit = (e: React.FormEvent) => {
		e.preventDefault();
		onApply({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
		});
	};
	const resetEdit = (e: React.FormEvent) => {
		e.preventDefault();
		const resetValues = {
			fontFamilyOption: fontFamilyOptions[0],
			fontSizeOption: fontSizeOptions[0],
			fontColor: fontColors[0],
			backgroundColor: backgroundColors[0],
			contentWidth: contentWidthArr[0],
		};
		onApply(resetValues);
	};

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggle} />
			<aside
				ref={overlayRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form className={styles.form} onSubmit={applyEdit} onReset={resetEdit}>
					<div className={styles.contentContainer}>
						<p className={styles.title}>Задайте параметры</p>
						<Select
							selected={fontFamily}
							options={fontFamilyOptions}
							title='шрифт'
							onChange={setFontFamily}
						/>
						<div className={styles.middleContainer}>
							<Option
								title={fontSizeOptions[0].title}
								value={fontSizeOptions[0].value}
								selected={fontSize}
								groupName='размер шрифта'
								option={fontSizeOptions[0]}
								onChange={setFontSize}
							/>
							<Option
								title={fontSizeOptions[1].title}
								value={fontSizeOptions[1].value}
								selected={fontSize}
								groupName='размер шрифта'
								option={fontSizeOptions[1]}
								onChange={setFontSize}
							/>
							<Option
								title={fontSizeOptions[2].title}
								value={fontSizeOptions[2].value}
								selected={fontSize}
								groupName='размер шрифта'
								option={fontSizeOptions[2]}
								onChange={setFontSize}
							/>
						</div>
						<Select
							selected={fontColor}
							options={fontColors}
							title='цвет шрифта'
							onChange={setFontColor}
						/>
						<Separator />
						<Select
							selected={bgColor}
							options={backgroundColors}
							title='цвет фона'
							onChange={setBgColor}
						/>
						<Select
							selected={contentWidth}
							options={contentWidthArr}
							title='ширина контента'
							onChange={setContentWidth}
						/>
					</div>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
