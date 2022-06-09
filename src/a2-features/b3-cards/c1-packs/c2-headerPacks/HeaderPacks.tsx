import React, {useState} from 'react';
import s from './HeaderPacks.module.css'
import {useAppDispatch} from "../../../../a1-main/b2-bll/store";
import {addPackThunk, setFilterNamePacks} from "../../../../a1-main/b2-bll/packsReducer";
import SuperInputText from "../../../../a1-main/b1-ui/common/superInputText/SuperInputText";
import {SearchField} from "../../../../a1-main/b1-ui/common/searchField/SearchField";
import SuperButton from "../../../../a1-main/b1-ui/common/superButton/SuperButton";

const HeaderPacks = () => {
    const [filter, setFilter] = useState(false)
    const dispatch = useAppDispatch()

    const changeFilterValue = (nameValue: string) => {
        setFilter(!filter)
        dispatch(setFilterNamePacks(+filter, nameValue))
    }


    const addPackHandler = () => {
        const newPack = prompt('Введите имя пака')
        newPack && dispatch(addPackThunk(newPack))

    }


    return (
        <div>
            <div className={s.search}>
                <SearchField/>
                <SuperButton onClick={addPackHandler}>add pack</SuperButton>
            </div>
            <ul className={s.headerContainer}>
                <div onClick={() => changeFilterValue('name')}>Name</div>
                <div onClick={() => changeFilterValue('cardsCount')}>cards</div>
                <div onClick={() => changeFilterValue('updated')}>Last Updated</div>
                <div>Created by</div>
                <div>Actions</div>
            </ul>
        </div>
    );
};

export default HeaderPacks;