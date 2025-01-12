import React, { useState } from "react";
import DataVisualization from "./data_visualization";
import { SQLDisplay } from "./sql_display";
import Table from "./table";

import { BsChevronCompactDown, BsDashLg, BsTable } from "react-icons/bs";

const ResultsContainer = ({
  visualization,
  setVisualization,
  mobileTableRef,
  mobileSqlRef,
  mapRef,
  tableInfo,
  points,
  sql,
  props,
  isStartingState,
  isLoading,
  tableColumns,
  tableRows,
  tableNames,
  sqlExplanationIsOpen,
  setSqlExplanationIsOpen,
  isExplainSqlLoading,
  sqlExplanation,
  explainSql,
  executeSql,
  setSQL,
}) => {
  return (
    <div className="flex flex-col lg:flex-row h-full w-full gap-6 p-6">
      {!isStartingState && (
        <DataVisualization
          visualization={visualization}
          setVisualization={setVisualization}
          mobileTableRef={mobileTableRef}
          mobileSqlRef={mobileSqlRef}
          mapRef={mapRef}
          tableInfo={tableInfo}
          points={points}
          sql={sql}
          props={props}
        />
      )}

      <div className="gap-3 flex flex-col h-full w-full lg:max-h-full overflow-y-auto items-center">
        <div className="flex flex-col space-y-4 w-full">
          {!isLoading && sql.length !== 0 && (
            <>
              <div>
                <SQLDisplay
                  sql={sql}
                  setSqlExplanationIsOpen={setSqlExplanationIsOpen}
                  sqlExplanationIsOpen={sqlExplanationIsOpen}
                  isExplainSqlLoading={isExplainSqlLoading}
                  sqlExplanation={sqlExplanation}
                  explainSql={explainSql}
                  executeSql={executeSql}
                  setSQL={setSQL}
                />
              </div>

              <Table columns={tableColumns} values={tableRows} />
            </>
          )}
          {tableNames && <TableNamesDisplay tableNames={tableNames} />}
        </div>
      </div>
    </div>
  );
};

export default ResultsContainer;

const TableNamesDisplay = ({ tableNames }) => {
  const [minimizeTableNames, setMinimizeTableNames] = useState(false);
  return (
    <div className="flex flex-col w-full rounded-lg shadow bg-gray-100 dark:bg-dark-800 ring-dark-300 ring-0">
      <div className="flex w-full justify-between p-2 items-center rounded-t-lg bg-gradient-to-b dark:from-black/50 from-neutral-300/75 to-neutral-300/50 dark:to-black/20 backdrop-blur-sm">
        <div className="inline-flex items-center space-x-2">
          <BsTable className="dark:text-white/60" />
          <span className="font-medium text-sm">Tables Queried</span>
        </div>

        <button
          className="text-sm rounded-full p-1 bg-white/10 hover:bg-white/20"
          onClick={() => setMinimizeTableNames(!minimizeTableNames)}
        >
          {minimizeTableNames ? <BsChevronCompactDown /> : <BsDashLg />}
        </button>
      </div>

      {!minimizeTableNames && (
        <ul className="font-medium text-left">
          {tableNames.map((tableName, index) => (
            <li
              className={`${
                index % 2 == 0
                  ? "dark:bg-black/10 bg-gray-400/10"
                  : "dark:bg-black/20 bg-gray-400/20"
              } py-1 pl-2 backdrop-blur-md border-b dark:border-white/10 border-black/10 ${
                index === tableNames.length - 1 && "rounded-b-lg border-b-0"
              }`}
              key={"name_" + index}
            >
              <span className="text-sm">{tableName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
