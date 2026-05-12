"use client";

import Image from "next/image";
import { useMemo, useState } from "react";

const ROWS = 8;
const COLUMNS = 6;
const MINE_COUNT = 8;
const TOTAL_CELLS = ROWS * COLUMNS;
const CELL_SIZE = 36;

type GameStatus = "playing" | "won" | "lost";

type MineCell = {
  id: number;
  row: number;
  column: number;
  hasMine: boolean;
  adjacentMines: number;
  isRevealed: boolean;
  isFlagged: boolean;
};

const getCellId = (row: number, column: number) => row * COLUMNS + column;

const getNeighborIds = (cell: Pick<MineCell, "row" | "column">) => {
  const neighborIds: number[] = [];

  for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
    for (let columnOffset = -1; columnOffset <= 1; columnOffset += 1) {
      if (rowOffset === 0 && columnOffset === 0) {
        continue;
      }

      const row = cell.row + rowOffset;
      const column = cell.column + columnOffset;

      if (row < 0 || row >= ROWS || column < 0 || column >= COLUMNS) {
        continue;
      }

      neighborIds.push(getCellId(row, column));
    }
  }

  return neighborIds;
};

const createMineCells = (): MineCell[] => {
  const mineIds = new Set<number>();

  while (mineIds.size < MINE_COUNT) {
    mineIds.add(Math.floor(Math.random() * TOTAL_CELLS));
  }

  return Array.from({ length: TOTAL_CELLS }, (_, id) => {
    const row = Math.floor(id / COLUMNS);
    const column = id % COLUMNS;
    const hasMine = mineIds.has(id);
    const adjacentMines = getNeighborIds({ row, column }).filter((neighborId) =>
      mineIds.has(neighborId),
    ).length;

    return {
      id,
      row,
      column,
      hasMine,
      adjacentMines,
      isRevealed: false,
      isFlagged: false,
    };
  });
};

const revealSafeArea = (cells: MineCell[], startId: number) => {
  const nextCells = cells.map((cell) => ({ ...cell }));
  const cellsToReveal = [startId];
  const visitedIds = new Set<number>();

  while (cellsToReveal.length > 0) {
    const cellId = cellsToReveal.pop();

    if (cellId === undefined || visitedIds.has(cellId)) {
      continue;
    }

    visitedIds.add(cellId);

    const cell = nextCells[cellId];

    if (!cell || cell.isFlagged || cell.isRevealed) {
      continue;
    }

    cell.isRevealed = true;

    if (cell.adjacentMines !== 0) {
      continue;
    }

    getNeighborIds(cell).forEach((neighborId) => {
      const neighbor = nextCells[neighborId];

      if (!neighbor || neighbor.hasMine || neighbor.isFlagged) {
        return;
      }

      cellsToReveal.push(neighborId);
    });
  }

  return nextCells;
};

const getStatusMessage = (status: GameStatus) => {
  if (status === "won") {
    return "You cleared the field!";
  }

  if (status === "lost") {
    return "Boom! Try again?";
  }

  return "Find the mines.";
};

const getCellLabel = (cell: MineCell, status: GameStatus) => {
  const position = `row ${cell.row + 1}, column ${cell.column + 1}`;

  if (cell.isFlagged) {
    return `Flagged cell at ${position}`;
  }

  if (!cell.isRevealed && status !== "lost") {
    return `Hidden cell at ${position}`;
  }

  if (cell.hasMine) {
    return `Mine at ${position}`;
  }

  if (cell.adjacentMines === 0) {
    return `Empty cell at ${position}`;
  }

  return `${cell.adjacentMines} neighboring mines at ${position}`;
};

const renderCellContent = (cell: MineCell, status: GameStatus) => {
  if (cell.isFlagged) {
    return (
      <Image
        src="/xp-icons/MINESWEEPER_FLAG.png"
        alt=""
        width={22}
        height={22}
        aria-hidden="true"
        className="pointer-events-none"
      />
    );
  }

  if (cell.hasMine && (cell.isRevealed || status === "lost")) {
    return (
      <Image
        src="/xp-icons/Minesweeper.png"
        alt=""
        width={24}
        height={24}
        aria-hidden="true"
        className="pointer-events-none"
      />
    );
  }

  if (!cell.isRevealed) {
    return "";
  }

  if (cell.adjacentMines === 0) {
    return "";
  }

  return String(cell.adjacentMines);
};

const getCellClassName = (cell: MineCell, status: GameStatus) => {
  if (cell.hasMine && (cell.isRevealed || status === "lost")) {
    return "border-[#808080] bg-[#f87171] text-black";
  }

  if (cell.isRevealed) {
    return "border-[#808080] bg-[#c0c0c0] text-[#000080] shadow-none";
  }

  return "border-b-[#808080] border-r-[#808080] border-l-white border-t-white bg-[#c0c0c0] text-black shadow-[inset_-1px_-1px_0_#808080,inset_1px_1px_0_#ffffff]";
};

export const MinesweeperWindowContent = () => {
  const [cells, setCells] = useState(() => createMineCells());
  const [status, setStatus] = useState<GameStatus>("playing");

  const flaggedCount = useMemo(
    () => cells.filter((cell) => cell.isFlagged).length,
    [cells],
  );
  const remainingMines = Math.max(MINE_COUNT - flaggedCount, 0);

  const handleNewGame = () => {
    setCells(createMineCells());
    setStatus("playing");
  };

  const handleRevealCell = (cellId: number) => {
    if (status !== "playing") {
      return;
    }

    const selectedCell = cells[cellId];

    if (!selectedCell || selectedCell.isRevealed || selectedCell.isFlagged) {
      return;
    }

    if (selectedCell.hasMine) {
      setCells((currentCells) =>
        currentCells.map((cell) =>
          cell.id === cellId ? { ...cell, isRevealed: true } : cell,
        ),
      );
      setStatus("lost");
      return;
    }

    const nextCells = revealSafeArea(cells, cellId);
    const hasWon = nextCells.every((cell) => cell.hasMine || cell.isRevealed);

    setCells(nextCells);

    if (hasWon) {
      setStatus("won");
    }
  };

  const handleToggleFlag = (cellId: number) => {
    if (status !== "playing") {
      return;
    }

    setCells((currentCells) =>
      currentCells.map((cell) => {
        if (cell.id !== cellId || cell.isRevealed) {
          return cell;
        }

        return { ...cell, isFlagged: !cell.isFlagged };
      }),
    );
  };

  const handleCellContextMenu = (
    event: React.MouseEvent<HTMLButtonElement>,
    cellId: number,
  ) => {
    event.preventDefault();
    handleToggleFlag(cellId);
  };

  const handleCellKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    cellId: number,
  ) => {
    if (event.key === "f" || event.key === "F") {
      event.preventDefault();
      handleToggleFlag(cellId);
    }
  };

  return (
    <div
      className="flex h-full flex-col bg-[#c0c0c0] p-2 font-[Tahoma,Arial,sans-serif] text-[11px] text-black"
    >
      <div className="mb-2 flex items-center justify-between border border-b-white border-r-white border-l-[#808080] border-t-[#808080] bg-[#c0c0c0] p-1">
        <div className="min-w-[54px] bg-black px-2 py-1 text-center font-mono text-[18px] leading-none text-red-600">
          {String(remainingMines).padStart(2, "0")}
        </div>

        <button
          type="button"
          aria-label="Start a new Minesweeper game"
          onClick={handleNewGame}
          className="flex h-8 w-8 items-center justify-center border border-b-[#808080] border-r-[#808080] border-l-white border-t-white bg-[#c0c0c0] p-0 shadow-[inset_-1px_-1px_0_#808080,inset_1px_1px_0_#ffffff] active:border-b-white active:border-r-white active:border-l-[#808080] active:border-t-[#808080]"
        >
          <Image
            src={
              status === "lost"
                ? "/xp-icons/MINESWEEPER_SMILEY_DEATH.png"
                : "/xp-icons/MINESWEEPER_SMILEY.png"
            }
            alt=""
            width={24}
            height={24}
            aria-hidden="true"
            className="pointer-events-none"
          />
        </button>

        <div className="min-w-[54px] bg-black px-2 py-1 text-center font-mono text-[18px] leading-none text-red-600">
          {ROWS}x{COLUMNS}
        </div>
      </div>

      <p className="sr-only" role="status">
        {getStatusMessage(status)} Left click opens. Right click or press F flags.
      </p>

      <div className="flex min-h-0 justify-center">
        <div
          className="grid border border-b-white border-r-white border-l-[#808080] border-t-[#808080] bg-[#808080]"
          style={{
            width: COLUMNS * CELL_SIZE,
            height: ROWS * CELL_SIZE,
            gridTemplateColumns: `repeat(${COLUMNS}, minmax(0, 1fr))`,
            gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`,
          }}
        >
          {cells.map((cell) => (
            <button
              key={cell.id}
              type="button"
              aria-label={getCellLabel(cell, status)}
              onClick={() => handleRevealCell(cell.id)}
              onContextMenu={(event) => handleCellContextMenu(event, cell.id)}
              onKeyDown={(event) => handleCellKeyDown(event, cell.id)}
              className={`flex aspect-square h-full min-h-0 w-full min-w-0 items-center justify-center overflow-hidden border p-0 text-[14px] font-bold leading-none ${getCellClassName(cell, status)}`}
            >
              {renderCellContent(cell, status)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
