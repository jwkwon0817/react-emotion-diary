import React, { useState } from 'react';
import { MyButton } from './MyButton';
import { useNavigate } from 'react-router-dom';
import { DiaryItem } from './DiaryItem';

const sortOptionList = [
	{
		value: 'latest', name: 'Newest',
	},
	{
		value: 'oldest', name: 'Oldest',
	},
];

const filterOptionList = [
	{
		value: 'all', name: 'All',
	},
	{
		value: 'good', name: 'Only Good Feelings',
	},
	{
		value: 'bad', name: 'Only Bad Feelings',
	},
];

const ControlMenu = React.memo(({ value, onChange, optionList }) => {
	return (
		<select className={ 'ControlMenu' } value={ value } onChange={ (e) => onChange(e.target.value) }>
			{
				optionList.map((option, index) => {
					return (
						<option key={ index } value={ option.value }>{ option.name }</option>
					);
				})
			}
		</select>
	);
});

export const DiaryList = ({ diaryList }) => {
	const navigate = useNavigate();
	
	const [ sortType, setSortType ] = useState('latest');
	const [ filter, setFilter ] = useState('all');
	
	const getProcessedDiaryList = () => {
		const filterCallBack = (item) => {
			if (filter === 'good') {
				return parseInt(item.emotion) <= 3;
			} else {
				return parseInt(item.emotion) > 3;
			}
		};
		
		const compare = (a, b) => {
			if (sortType === 'latest') {
				return parseInt(b.date) - parseInt(a.date);
			} else {
				return parseInt(a.date) - parseInt(b.date);
			}
		};
		
		const copyList = JSON.parse(JSON.stringify(diaryList));
		
		const filteredList = filter === 'all' ? copyList : copyList.filter((item) => filterCallBack(item));
		
		return filteredList.sort(compare);
	};
	
	return (
		<div className={ 'DiaryList' }>
			<div className={ 'menu-wrapper' }>
				<div className={ 'left-col' }>
					<ControlMenu value={ sortType } onChange={ setSortType } optionList={ sortOptionList } />
					<ControlMenu value={ filter } onChange={ setFilter } optionList={ filterOptionList } />
				</div>
				<div className={ 'right-col' }>
					<MyButton type={ 'positive' } text={ 'Add Diary' } onClick={ () => {
						navigate('/new');
					} } />
				</div>
			</div>
			{
				getProcessedDiaryList().map((diary) => {
					return (
						<DiaryItem key={ diary.id } { ...diary } />
					);
				})
			}
		</div>
	);
};

DiaryList.defaultProps = {
	diaryList: [],
};