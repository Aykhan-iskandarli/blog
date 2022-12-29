import {ReactElement} from 'react';

export type ITabProps = {
    title: any[],
    children: ReactElement[]
}

export type ITabHeadProps = {
    title: string
    index: number
    setSelectedTab: (index: any) => void
    activeNumber: number
}
