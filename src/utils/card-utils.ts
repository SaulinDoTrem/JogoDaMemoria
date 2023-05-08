import { MemoryCardProps } from "../components/MemoryCard";

const keyGen = () => {
    return (
        Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    );
};

const duplicateArray = <T>(array: T[]): T[] => {
    return [...array, ...array];
};

const sortArray = <T>(array: T[]): T[] => {
    return array.sort(() => Math.random() - 0.5);
};

const regenerateCard = (cards: MemoryCardProps[]): MemoryCardProps[] => {
    return cards.map((card) => ({ ...card, id: keyGen() }));
};

export const duplicateRegenerateSortArray = (cards: MemoryCardProps[]): MemoryCardProps[] => {
    return sortArray(regenerateCard(duplicateArray(cards)));
};
