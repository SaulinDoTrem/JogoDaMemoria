import { useRef, useState } from "react";
import { MemoryCard, MemoryCardProps } from "./MemoryCard";
import { duplicateRegenerateSortArray } from "../utils/card-utils";

export interface GridProps {
    cards: MemoryCardProps[];
}

export function Grid({ cards }: GridProps) {
    const [stateCards, setStateCards] = useState(() => {
        return duplicateRegenerateSortArray(cards);
    });

    const firstFlippedCard = useRef<MemoryCardProps | null>(null);
    const secondFlippedCard = useRef<MemoryCardProps | null>(null);
    const unflip = useRef(false);
    const [matches, setMatches] = useState(0);
    const [moves, setMoves] = useState(0);

    const handleReset = () => {
        setStateCards(duplicateRegenerateSortArray(cards));
        firstFlippedCard.current = null;
        secondFlippedCard.current = null;
        unflip.current = false;
        setMatches(0);
        setMoves(0);
    };

    const handleClick = (id: string) => {
        const newStateCards = stateCards.map((card) => {
            // se o id não corresponder com o id do card clicado
            if (card.id !== id) return card;
            // se o card ja estiver virado
            if (card.flipped) return card;

            // reseta as variáveis de controle
            if (unflip.current && firstFlippedCard.current && secondFlippedCard.current) {
                firstFlippedCard.current.flipped = false;
                secondFlippedCard.current.flipped = false;
                firstFlippedCard.current = null;
                secondFlippedCard.current = null;
                unflip.current = false;
            }

            // desvira o card
            card.flipped = true;

            // Configura primeiro e segundo cards clicados
            if (firstFlippedCard.current === null) {
                firstFlippedCard.current = card;
                return card;
            }
            if (secondFlippedCard.current === null) secondFlippedCard.current = card;

            // se eu tenho dois cards virados
            if (firstFlippedCard.current && secondFlippedCard.current) {
                // se eles são iguais
                if (firstFlippedCard.current.emoji === secondFlippedCard.current.emoji) {
                    // movimento certo
                    firstFlippedCard.current = null;
                    secondFlippedCard.current = null;
                    setMatches((m) => m + 1);
                } else {
                    // movimento errado
                    unflip.current = true;
                }

                setMoves((m) => m + 1);
            }

            return card;
        });

        setStateCards(newStateCards);
    };

    return (
        <>
            <div className="text">
                <h1>Jogo da Memória</h1>
                <p>
                    Movimentos: {moves} | Combinações: {matches}
                </p>
                <button onClick={handleReset}>Reset</button>
            </div>
            <div className="grid">
                {stateCards.map((card) => {
                    return <MemoryCard {...card} handleClick={handleClick} key={card.id} />;
                })}
            </div>
        </>
    );
}
