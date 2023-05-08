export interface MemoryCardProps {
    flipped?: boolean;
    emoji: string;
    id: string;
    handleClick?: (id: string) => void;
}

export const MemoryCard = ({ flipped = false, emoji, id, handleClick }: MemoryCardProps) => {
    const cardContentClassNames = ["card__content"];
    flipped && cardContentClassNames.push("card__content--flipped");

    const handleClickFn = () => {
        if (handleClick) handleClick(id);
    };

    return (
        <div className="card" onClick={() => handleClickFn()}>
            <div className={cardContentClassNames.join(" ")}>
                <div className="card__face card__face__front">?</div>
                <div className="card__face card__face__back">{emoji}</div>
            </div>
        </div>
    );
};
