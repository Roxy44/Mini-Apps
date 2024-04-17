import { store } from './store';

export type RootState = ReturnType<typeof store.getState>;

export type ChartDataType = {
    labels: string[],
    datasets: {
        label: string,
        data: number[],
        backgroundColor: string[],
        borderColor: string[],
        borderWidth: number 
    }[],
}

export type GraphDataType = {
    labels: number[],
    datasets: {
        label: string,
        data: { x: number, y: number }[],
        borderColor: string,
        fill?: boolean,
        tension?: number
    }[],
}

export type ChartDataSetType = {
    [key: string]: string & number;
}