import { Color } from '../colors';
import { CopySize } from '../copy';
import { Icon, IconName, IconProps, IconSize } from '../icons';
import * as React from 'react';
import { EditState } from '../../types';
import { getSpace, SpaceSize } from '../space';
import styled from 'styled-components';

export type JustifyType = 'start' | 'center' | 'end' | 'stretch';

export interface ViewEditableTitleProps {
	fontSize?: CopySize;
	nameState: EditState;
	title: string;
	onBlur?: React.FocusEventHandler<HTMLInputElement>;
	onChange?: React.ChangeEventHandler<HTMLInputElement>;
	onClick?: React.MouseEventHandler<HTMLElement>;
	onFocus?: React.FocusEventHandler<HTMLInputElement>;
	onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
}

interface ViewEditableInputProps {
	autofocus: boolean;
	fontSize?: CopySize;
	justify?: 'start' | 'center' | 'end' | 'stretch';
}

export interface ViewSwitchProps {
	fontSize?: CopySize;
	justify?: JustifyType;
	leftVisible: boolean;
	onLeftClick?: React.MouseEventHandler<SVGElement>;
	onRightClick?: React.MouseEventHandler<SVGElement>;
	rightVisible: boolean;
}

export interface StyledViewButtonProps {
	onClick?: React.MouseEventHandler<SVGElement>;
}

export interface ViewButtonProps {
	onClick?: React.MouseEventHandler<SVGElement>;
	title: string;
}

export interface ViewTitleProps {
	fontSize?: CopySize;
	justify?: JustifyType;
	title: string;
}

interface StyledIconProps extends IconProps {
	visible: boolean;
}

interface StyledViewSwitchProps {
	fontSize?: CopySize;
	justify?: 'start' | 'center' | 'end' | 'stretch';
}

interface StyledTitleProps {
	grow?: boolean;
	onClick?: React.MouseEventHandler<HTMLElement>;
}

const StyledViewSwitch = styled.div`
	display: flex;
	align-self: center;
	justify-self: ${(props: StyledViewSwitchProps) => props.justify || 'start'};
	font-size: ${(props: StyledViewSwitchProps) =>
		props.fontSize ? `${props.fontSize}px` : `${CopySize.S}px`};
`;

// tslint:disable-next-line:no-any
const StyledViewButton: any = styled.div`
	display: flex;
	align-self: center;
	justify-self: start;
	font-size: ${`${CopySize.S}px`};
	border-radius: ${getSpace(SpaceSize.XXS)}px;
	&:hover {
		background: ${Color.Grey90};
	}
`;

const StyledTitle = styled.strong`
	position: relative;
	align-self: center;
	display: inline-block;
	width: ${(props: StyledTitleProps) => (props.grow ? 'auto' : '130px')};
	margin: 0 ${getSpace(SpaceSize.XS)}px ${getSpace(SpaceSize.XXS)}px;
	overflow: hidden;
	color: ${Color.Grey36};
	font-size: inherit;
	font-weight: normal;
	text-align: center;
	text-overflow: ellipsis;
	white-space: nowrap;
`;

const StyledIcons = styled(Icon)`
	padding: ${getSpace(SpaceSize.XXS)}px;
	border-radius: ${getSpace(SpaceSize.XXS)}px;
	visibility: ${(props: StyledIconProps) => (props.visible ? 'visible' : 'hidden')};
	cursor: pointer;
	pointer-events: auto;
	&:hover {
		background: ${Color.Grey90};
	}
`;

const StyledInput = styled.input`
	width: 130px;
	padding: 0 ${getSpace(SpaceSize.XS)}px ${getSpace(SpaceSize.XXS)}px;
	border: 0;
	margin: 0;
	background-color: ${Color.White};
	text-align: center;
	font-size: ${(props: ViewEditableInputProps) =>
		props.fontSize ? `${props.fontSize}px` : `${CopySize.S}px`};
`;

export const ViewEditableTitle: React.SFC<ViewEditableTitleProps> = (props): JSX.Element => (
	<StyledViewSwitch fontSize={props.fontSize} onClick={props.onClick}>
		{props.nameState === EditState.Editing ? (
			<StyledInput
				autofocus
				fontSize={props.fontSize}
				onBlur={props.onBlur}
				onChange={props.onChange}
				onFocus={props.onFocus}
				onKeyDown={props.onKeyDown}
				value={props.title}
			/>
		) : (
			<StyledTitle>{props.title}</StyledTitle>
		)}
	</StyledViewSwitch>
);

export const ViewTitle: React.SFC<ViewTitleProps> = (props): JSX.Element => (
	<StyledViewSwitch justify={props.justify} fontSize={props.fontSize}>
		<StyledTitle>{props.title}</StyledTitle>
	</StyledViewSwitch>
);

export const ViewButton: React.SFC<ViewButtonProps> = (props): JSX.Element => (
	<StyledViewButton onClick={props.onClick}>
		<StyledIcons
			color={Color.Grey60}
			size={IconSize.XS}
			name={IconName.ArrowLeft}
			visible={true}
		/>
		<StyledTitle grow>{props.title}</StyledTitle>
	</StyledViewButton>
);

export const ViewSwitch: React.SFC<ViewSwitchProps> = (props): JSX.Element => (
	<StyledViewSwitch justify={props.justify} fontSize={props.fontSize}>
		<StyledIcons
			color={Color.Grey60}
			onClick={props.onLeftClick}
			size={IconSize.XS}
			name={IconName.ArrowLeft}
			visible={props.leftVisible}
		/>
		{props.children}
		<StyledIcons
			color={Color.Grey60}
			onClick={props.onRightClick}
			size={IconSize.XS}
			name={IconName.ArrowRight}
			visible={props.rightVisible}
		/>
	</StyledViewSwitch>
);