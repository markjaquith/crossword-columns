import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";

interface Clue {
  number: number;
  text: string;
}

interface ClueSet {
  across: Clue[];
  down: Clue[];
}

interface Config {
  columnCount: number;
  puzzleWidth: number;
  puzzleHeight: number;
  puzzleColSpan: number;
  columnGap: number;
  rowGap: number;
}

const sampleClues: ClueSet = {
  across: [
    { number: 1, text: "Capital of France" },
    { number: 4, text: "Large body of water" },
    { number: 7, text: "Man's best friend" },
    { number: 9, text: "Yellow citrus fruit" },
    { number: 11, text: "Opposite of hot" },
    { number: 13, text: "Flying mammal" },
    { number: 15, text: "Red planet" },
    { number: 17, text: "Frozen water" },
    { number: 19, text: "King of the jungle" },
    { number: 21, text: "Sweet treat made from cocoa" },
    { number: 23, text: "Device for telling time" },
    { number: 25, text: "Green vegetable that makes you strong" },
    { number: 27, text: "Musical instrument with keys" },
    { number: 29, text: "Bright star in our solar system" },
    { number: 31, text: "Largest mammal in the ocean" },
    { number: 33, text: "Black and white striped animal" },
    { number: 35, text: "Tool for cutting wood" },
    { number: 37, text: "Frozen dessert on a stick" },
    { number: 39, text: "Bird that hoots at night" },
    { number: 41, text: "Insect with beautiful wings" },
    { number: 43, text: "Tall plant that grows in deserts" },
    { number: 45, text: "Animal that changes color" },
    { number: 47, text: "Small furry pet that squeaks" },
    { number: 49, text: "Large cat with a mane" },
    { number: 51, text: "Flying insect that makes honey" },
    { number: 53, text: "Reptile with a hard shell" },
    { number: 55, text: "Bird that cannot fly but swims well" },
    { number: 57, text: "Animal with a long trunk" },
    { number: 59, text: "Fastest land animal" },
    { number: 61, text: "Animal that hops and has long ears" },
    { number: 63, text: "Large fish that lives in the ocean" },
    { number: 65, text: "Bird of prey with excellent eyesight" },
    { number: 67, text: "Animal that hibernates in winter" },
    { number: 69, text: "Insect that glows in the dark" },
    { number: 71, text: "Animal with black and white fur" },
    { number: 73, text: "Large bird that cannot fly" },
    { number: 75, text: "Animal with a pouch" },
    { number: 77, text: "Insect that chirps at night" },
    { number: 79, text: "Animal with quills" },
    { number: 81, text: "Bird that mimics human speech" },
    { number: 83, text: "Animal that builds dams" },
    { number: 85, text: "Insect that spins webs" },
    { number: 87, text: "Nocturnal flying mammal" },
    { number: 89, text: "Large marine mammal with tusks" },
    { number: 91, text: "Slow-moving tree dweller" },
    { number: 93, text: "Desert ship with humps" },
    { number: 95, text: "Spotted wild cat" },
    { number: 97, text: "Tallest land animal" },
    { number: 99, text: "Arctic bear" },
    { number: 101, text: "Primate that swings from trees" },
    { number: 103, text: "Large horned African animal" },
    { number: 105, text: "Flightless Antarctic bird" },
    { number: 107, text: "Marsupial from Australia" },
    { number: 109, text: "Largest land animal" },
    { number: 111, text: "Carnivorous plant" },
    { number: 113, text: "Poisonous snake" },
    { number: 115, text: "Eight-legged arachnid" },
    { number: 117, text: "Colorful tropical bird" },
    { number: 119, text: "Nocturnal rodent" },
    { number: 121, text: "Amphibian that croaks" },
    { number: 123, text: "Slimy garden pest" },
  ],
  down: [
    { number: 1, text: "Tall building in a city" },
    { number: 2, text: "Small red fruit" },
    { number: 3, text: "Ocean predator with fins" },
    { number: 5, text: "Feline pet" },
    { number: 6, text: "Round object used in sports" },
    { number: 8, text: "Vehicle with four wheels" },
    { number: 10, text: "Insect that makes honey" },
    { number: 12, text: "White precipitation from clouds" },
    { number: 14, text: "Nocturnal bird of prey" },
    { number: 16, text: "Wooden writing instrument" },
    { number: 18, text: "Colorful arc in the sky after rain" },
    { number: 20, text: "Large gray animal with trunk" },
    { number: 22, text: "Striped African animal" },
    { number: 24, text: "Flying insect with colorful wings" },
    { number: 26, text: "Reptile that changes colors" },
    { number: 28, text: "Small rodent that squeaks" },
    { number: 30, text: "Fruit that keeps the doctor away" },
    { number: 32, text: "Yellow curved fruit" },
    { number: 34, text: "Orange vegetable that rabbits love" },
    { number: 36, text: "Green leafy vegetable" },
    { number: 38, text: "Red vegetable used in salads" },
    { number: 40, text: "Purple vegetable with green top" },
    { number: 42, text: "White vegetable that makes you cry" },
    { number: 44, text: "Green vegetable that looks like a tree" },
    { number: 46, text: "Yellow vegetable that pops" },
    { number: 48, text: "Orange fruit with segments" },
    { number: 50, text: "Green fruit used to make guacamole" },
    { number: 52, text: "Red berry used in jams" },
    { number: 54, text: "Purple fruit that grows in bunches" },
    { number: 56, text: "Tropical fruit with spiky skin" },
    { number: 58, text: "Fuzzy brown fruit with green inside" },
    { number: 60, text: "Yellow citrus fruit" },
    { number: 62, text: "Green citrus fruit" },
    { number: 64, text: "Stone fruit with fuzzy skin" },
    { number: 66, text: "Small round fruit that grows on trees" },
    { number: 68, text: "Red fruit with seeds on the outside" },
    { number: 70, text: "Blue fruit that grows in clusters" },
    { number: 72, text: "Tropical fruit with hard shell" },
    { number: 74, text: "Sweet fruit that grows in warm climates" },
    { number: 76, text: "Sour fruit used in cooking" },
    { number: 78, text: "Dried fruit that wrinkles" },
    { number: 80, text: "Nut that grows on trees" },
    { number: 82, text: "Seed that becomes a tree" },
    { number: 84, text: "Pod that contains seeds" },
    { number: 86, text: "Root vegetable that grows underground" },
    { number: 88, text: "Spicy root used in cooking" },
    { number: 90, text: "Herb used in Italian cooking" },
    { number: 92, text: "Leafy green used in salads" },
    { number: 94, text: "Crunchy vegetable in coleslaw" },
    { number: 96, text: "Green pods with round seeds" },
    { number: 98, text: "Long orange root vegetable" },
    { number: 100, text: "White root vegetable" },
    { number: 102, text: "Purple root vegetable" },
    { number: 104, text: "Green vegetable with florets" },
    { number: 106, text: "Red vegetable in pasta sauce" },
    { number: 108, text: "Green pepper variety" },
    { number: 110, text: "Spicy pepper variety" },
    { number: 112, text: "Sweet pepper variety" },
    { number: 114, text: "Leafy green vegetable" },
    { number: 116, text: "Crunchy salad vegetable" },
    { number: 118, text: "Green vegetable in guacamole" },
    { number: 120, text: "Sour pickled vegetable" },
    { number: 122, text: "Sweet corn variety" },
    { number: 124, text: "Starchy root vegetable" },
  ],
};

const ConfigPanel: React.FC<{ config: Config; onChange: (config: Config) => void }> = ({
  config,
  onChange,
}) => {
  // Calculate generated values
  const columnWidth = (config.puzzleWidth - (config.puzzleColSpan - 1) * config.columnGap) / config.puzzleColSpan;
  const containerWidth = config.columnCount * columnWidth + (config.columnCount - 1) * config.columnGap;
  const puzzleStartCol = config.columnCount - config.puzzleColSpan;
  const gridTemplateColumns = `repeat(${config.columnCount}, ${Math.round(columnWidth)}px)`;
  
  // Generate grid template areas - always exactly 2 rows
  const generateGridTemplateAreas = () => {
    // First row: puzzle in the right columns, regular columns elsewhere
    let firstRow = '';
    for (let col = 1; col <= config.columnCount; col++) {
      if (col > puzzleStartCol && col <= config.columnCount) {
        firstRow += 'puzl ';
      } else {
        firstRow += `col${col} `;
      }
    }
    
    // Second row: all columns
    let secondRow = '';
    for (let col = 1; col <= config.columnCount; col++) {
      secondRow += `col${col} `;
    }
    
    return `"${firstRow.trim()}" "${secondRow.trim()}"`;
  };
  
  const gridTemplateAreas = generateGridTemplateAreas();
  const totalRows = 2; // Always 2 rows
  return (
    <div style={{
      position: 'fixed',
      top: 10,
      left: 10,
      background: 'rgba(255, 255, 255, 0.95)',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      fontSize: '14px',
      minWidth: '280px'
    }}>
      <h3 style={{ margin: '0 0 10px 0', fontSize: '16px' }}>Configuration</h3>
      
      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', marginBottom: '2px' }}>Columns:</label>
        <input
          type="number"
          min="3"
          max="8"
          value={config.columnCount}
          onChange={(e) => onChange({ ...config, columnCount: parseInt((e.target as HTMLInputElement).value) })}
          style={{ width: '60px', padding: '2px' }}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', marginBottom: '2px' }}>Puzzle Width:</label>
        <input
          type="number"
          min="200"
          max="1000"
          step="50"
          value={config.puzzleWidth}
          onChange={(e) => onChange({ ...config, puzzleWidth: parseInt((e.target as HTMLInputElement).value) })}
          style={{ width: '80px', padding: '2px' }}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', marginBottom: '2px' }}>Puzzle Height:</label>
        <input
          type="number"
          min="200"
          max="1200"
          step="50"
          value={config.puzzleHeight}
          onChange={(e) => onChange({ ...config, puzzleHeight: parseInt((e.target as HTMLInputElement).value) })}
          style={{ width: '80px', padding: '2px' }}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', marginBottom: '2px' }}>Puzzle Span:</label>
        <input
          type="number"
          min="1"
          max={config.columnCount - 1}
          value={config.puzzleColSpan}
          onChange={(e) => onChange({ ...config, puzzleColSpan: parseInt((e.target as HTMLInputElement).value) })}
          style={{ width: '60px', padding: '2px' }}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', marginBottom: '2px' }}>Column Gap:</label>
        <input
          type="number"
          min="5"
          max="50"
          value={config.columnGap}
          onChange={(e) => onChange({ ...config, columnGap: parseInt((e.target as HTMLInputElement).value) })}
          style={{ width: '60px', padding: '2px' }}
        />
      </div>

      <div style={{ marginBottom: '8px' }}>
        <label style={{ display: 'block', marginBottom: '2px' }}>Row Gap:</label>
        <input
          type="number"
          min="5"
          max="50"
          value={config.rowGap}
          onChange={(e) => onChange({ ...config, rowGap: parseInt((e.target as HTMLInputElement).value) })}
          style={{ width: '60px', padding: '2px' }}
        />
      </div>

      <hr style={{ margin: '15px 0', border: 'none', borderTop: '1px solid #ddd' }} />
      
      <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#666' }}>Generated Values</h4>
      
      <div style={{ fontSize: '12px', color: '#555', lineHeight: '1.4' }}>
        <div style={{ marginBottom: '4px' }}>
          <strong>Column Width:</strong> {Math.round(columnWidth)}px
        </div>
        <div style={{ marginBottom: '4px' }}>
          <strong>Container Width:</strong> {Math.round(containerWidth)}px
        </div>
        <div style={{ marginBottom: '4px' }}>
          <strong>Puzzle Start Col:</strong> {puzzleStartCol + 1}
        </div>
        <div style={{ marginBottom: '4px' }}>
          <strong>Total Rows:</strong> {totalRows}
        </div>
        <div style={{ marginBottom: '4px' }}>
          <strong>Grid Template Columns:</strong><br />
          <code style={{ fontSize: '11px', background: '#f5f5f5', padding: '2px 4px', borderRadius: '2px' }}>
            {gridTemplateColumns}
          </code>
        </div>
        <div style={{ marginBottom: '4px' }}>
          <strong>Grid Template Areas:</strong><br />
          <code style={{ fontSize: '10px', background: '#f5f5f5', padding: '2px 4px', borderRadius: '2px', display: 'block', whiteSpace: 'pre-wrap' }}>
            {gridTemplateAreas.replace(/" "/g, '"\n"')}
          </code>
        </div>
      </div>
    </div>
  );
};

const DimensionOverlay: React.FC<{ width: number; height: number }> = ({ width, height }) => {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(0, 0, 0, 0.7)',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold',
      pointerEvents: 'none',
      zIndex: 10,
    }}>
      {width} × {height}
    </div>
  );
};

const CrosswordLayout: React.FC = () => {
  const [config, setConfig] = useState<Config>({
    columnCount: 2,
    puzzleWidth: 450,
    puzzleHeight: 600,
    puzzleColSpan: 1,
    columnGap: 0,
    rowGap: 0,
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const [columnElements, setColumnElements] = useState<HTMLDivElement[]>([]);

  const columnColors = [
    '#ffebee', '#e8f5e8', '#e3f2fd', '#fff3e0', '#f3e5f5',
    '#fce4ec', '#e0f2f1', '#e1f5fe', '#fff8e1', '#f1f8e9'
  ];

  const calculateLayout = () => {
    const columnWidth = (config.puzzleWidth - (config.puzzleColSpan - 1) * config.columnGap) / config.puzzleColSpan;
    const containerWidth = config.columnCount * columnWidth + (config.columnCount - 1) * config.columnGap;
    
    return { columnWidth, containerWidth };
  };

  const { columnWidth, containerWidth } = calculateLayout();

  const balanceColumns = () => {
    if (columnElements.length === 0) return;

    const allClues = [
      { type: 'header', content: 'ACROSS', height: 30 },
      ...sampleClues.across.map(clue => ({ 
        type: 'clue', 
        content: `${clue.number}. ${clue.text}`, 
        height: 25 
      })),
      { type: 'header', content: 'DOWN', height: 30 },
      ...sampleClues.down.map(clue => ({ 
        type: 'clue', 
        content: `${clue.number}. ${clue.text}`, 
        height: 25 
      })),
    ];

    const totalHeight = allClues.reduce((sum, item) => sum + item.height, 0);
    const targetHeightPerColumn = totalHeight / config.columnCount;

    const columnContents: any[][] = Array(config.columnCount).fill(null).map(() => []);
    const columnHeights = Array(config.columnCount).fill(0);
    
    let currentColumn = 0;

    for (const item of allClues) {
      if (currentColumn < config.columnCount - 1 && 
          columnHeights[currentColumn] + item.height > targetHeightPerColumn * 1.1 &&
          columnHeights[currentColumn] >= targetHeightPerColumn * 0.8) {
        currentColumn++;
      }

      columnContents[currentColumn].push(item);
      columnHeights[currentColumn] += item.height;
    }

    columnElements.forEach((column, index) => {
      if (column && columnContents[index]) {
        (column as HTMLDivElement).innerHTML = columnContents[index]!.map(item => {
          if (item.type === 'header') {
            return `<div style="font-weight: bold; font-size: 16px; margin: 15px 0 10px 0; text-transform: uppercase; border-bottom: 1px solid #ccc; padding-bottom: 5px;">${item.content}</div>`;
          } else {
            return `<div style="margin-bottom: 8px; font-size: 14px; line-height: 1.4;">${item.content}</div>`;
          }
        }).join('');
      }
    });
  };

  useEffect(() => {
    if (containerRef.current) {
      const columns: HTMLDivElement[] = [];
      for (let i = 0; i < config.columnCount; i++) {
        const column = containerRef.current.querySelector(`#column-${i}`) as HTMLDivElement;
        if (column) columns.push(column);
      }
      setColumnElements(columns);
    }
  }, [config.columnCount]);

  useEffect(() => {
    const timer = setTimeout(() => {
      balanceColumns();
    }, 100);
    return () => clearTimeout(timer);
  }, [config, columnElements]);

  const puzzleStartCol = config.columnCount - config.puzzleColSpan;

  // Generate grid template areas - always exactly 2 rows
  const generateGridTemplateAreas = () => {
    // First row: puzzle in the right columns, regular columns elsewhere
    let firstRow = '';
    for (let col = 1; col <= config.columnCount; col++) {
      if (col > puzzleStartCol && col <= config.columnCount) {
        firstRow += 'puzl ';
      } else {
        firstRow += `col${col} `;
      }
    }
    
    // Second row: all columns
    let secondRow = '';
    for (let col = 1; col <= config.columnCount; col++) {
      secondRow += `col${col} `;
    }
    
    return `"${firstRow.trim()}" "${secondRow.trim()}"`;
  };

  const gridTemplateAreas = generateGridTemplateAreas();
  const gridTemplateColumns = `repeat(${config.columnCount}, ${columnWidth}px)`;  
  console.log('Generated Grid Template:', {
    gridTemplateColumns,
    gridTemplateAreas,
    puzzleStartCol,
    columnCount: config.columnCount,
    puzzleColSpan: config.puzzleColSpan,
    columnWidth,
    containerWidth
  });

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <ConfigPanel config={config} onChange={setConfig} />
      
      <div
        ref={containerRef}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${config.columnCount}, ${columnWidth}px)`,
          gridTemplateAreas: gridTemplateAreas,
          gap: `${config.rowGap}px ${config.columnGap}px`,
          width: `${containerWidth}px`,
          margin: '0 auto',
          marginTop: '60px',
          position: 'relative',
        }}
      >
        <div
          style={{
            gridArea: 'puzl',
            width: `${config.puzzleWidth}px`,
            height: `${config.puzzleHeight}px`,
            background: '#333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontWeight: 'bold',
            justifySelf: 'end',
            position: 'relative',
          }}
        >
          <DimensionOverlay width={config.puzzleWidth} height={config.puzzleHeight} />
          Crossword Puzzle
        </div>

        {Array.from({ length: config.columnCount }, (_, i) => (
          <div
            key={i}
            id={`column-${i}`}
            style={{
              gridArea: `col${i + 1}`,
              background: columnColors[i % columnColors.length],
              padding: '10px',
              position: 'relative',
              minHeight: '100px',
            }}
          >
            <DimensionOverlay 
              width={Math.round(columnWidth)} 
              height={0} 
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const root = createRoot(document.body);
root.render(<CrosswordLayout />);