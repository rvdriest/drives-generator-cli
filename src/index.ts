#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import xlsx from "node-xlsx";
import path from "path";
import { getWeekdays } from "./utils";

const main = defineCommand({
  meta: {
    name: "generate-drives",
    version: "1.0.0",
    description: "Generate drives for a specific month",
  },
  args: {
    month: {
      type: "string",
      description: "The month to generate drives for",
      required: true,
    },
    year: {
      type: "string",
      description: "The year to generate drives for",
      required: true,
    },
    examplePath: {
      type: "string",
      description: "The path to the example file",
      required: true,
    },
  },
  run({ args }) {
    const month = Number.parseInt(args.month);
    const year = Number.parseInt(args.year);

    if (isNaN(month) || isNaN(year)) {
      console.error("Invalid month or year");
      process.exit(1);
    }

    const exampleFilePath = path.resolve(process.cwd(), args.examplePath);
    const worksheet = xlsx.parse(exampleFilePath);
    if (!worksheet.length) {
      console.error("Invalid example file");
      process.exit(1);
    }

    const exampleSheet = worksheet[0];
    const parsedData = parseData(exampleSheet.data);

    const dataRows = createDataRows(parsedData, { month, year }).map((d) =>
      Object.values(d)
    );

    const NEW_SHEET_NAME = "Generated drives";

    const outputBuffer = xlsx.build([
      ...worksheet
        .filter((w) => w.name !== NEW_SHEET_NAME)
        .map((w) => ({
          name: w.name,
          data: w.data,
          options: {},
        })),
      {
        name: "Generated drives",
        data: dataRows,
        options: {},
      },
    ]);

    // Output buffer to file
    const outputBufferStream = require("fs").createWriteStream(exampleFilePath);
    outputBufferStream.write(outputBuffer);
    outputBufferStream.end();

    console.log("Ritten zijn aangemaakt!");
  },
});

type ExampleDataRow = {
  from: string;
  to: string;
  kilometers: number;
  description: string;
};

function parseData(data: any[][]) {
  const parsedData: ExampleDataRow[][] = [];

  let currentParsedData: ExampleDataRow[] = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    if (!row.length) {
      if (currentParsedData.length) {
        parsedData.push(currentParsedData);
      }
      currentParsedData = [];
      continue;
    }

    const [from, to, kilometers, description] = row;
    currentParsedData.push({
      from,
      to,
      kilometers: +kilometers,
      description,
    });

    if (i === data.length - 1) {
      parsedData.push(currentParsedData);
    }
  }

  return parsedData;
}

type ExportDataRow = {
  date: string | null;
  hours: null;
  from: string;
  to: string;
  kilometers: number;
  amount: null;
  cost: null;
  vat: null;
  description: string;
};

type ExportDataRowExludingData = Omit<ExportDataRow, "date">;

function createDataRows(
  parsedData: ExampleDataRow[][],
  opts: { year: number; month: number }
) {
  const days = getWeekdays(opts.month, opts.year);
  const exportDataRows: ExportDataRow[] = [];

  const rides: ExportDataRowExludingData[][] = [];
  const MINIMUM_LAST_RIDE = 3;

  for (let i = 0; i < MINIMUM_LAST_RIDE; i++) {
    const lastParsedData = parsedData[parsedData.length - 1];

    // console.log("Last parsed data", lastParsedData);
    const ride: ExportDataRowExludingData[] = [];
    for (let j = 0; j < lastParsedData.length; j++) {
      const parsedDataSingleRide = lastParsedData[j];
      ride.push({
        hours: null,
        from: parsedDataSingleRide.from,
        to: parsedDataSingleRide.to,
        kilometers: parsedDataSingleRide.kilometers,
        amount: null,
        cost: null,
        vat: null,
        description: parsedDataSingleRide.description,
      });
    }

    rides.push(ride);
  }

  const amountToGenerate = days.length - MINIMUM_LAST_RIDE;
  for (let i = 0; i < amountToGenerate; i++) {
    // const day = days[i];
    // const date = `${day < 10 ? `0${day}` : day}-${
    //   opts.month < 10 ? `0${opts.month}` : opts.month
    // }-${opts.year}`;

    const randomParsedData =
      parsedData[Math.floor(Math.random() * parsedData.length)];
    const ride: ExportDataRowExludingData[] = [];
    for (let j = 0; j < randomParsedData.length; j++) {
      const parsedDataSingleRide = randomParsedData[j];
      ride.push({
        // date: lastDateIs(exportDataRows, date) ? null : date,
        hours: null,
        from: parsedDataSingleRide.from,
        to: parsedDataSingleRide.to,
        kilometers: parsedDataSingleRide.kilometers,
        amount: null,
        cost: null,
        vat: null,
        description: parsedDataSingleRide.description,
      });
    }

    rides.push(ride);
  }

  // Randomize rides array
  rides.sort(() => 0.5 - Math.random());

  // console.log(rides);

  for (let i = 0; i < rides.length; i++) {
    const ride = rides[i];
    const day = days[i];
    const date = `${day < 10 ? `0${day}` : day}-${
      opts.month < 10 ? `0${opts.month}` : opts.month
    }-${opts.year}`;

    for (let j = 0; j < ride.length; j++) {
      const singleRide = ride[j];
      const singleRideWithDate = {
        date: lastDateIs(exportDataRows, date) ? null : date,
        ...singleRide,
      };

      exportDataRows.push(singleRideWithDate);
    }
  }

  return exportDataRows;
}

function lastDateIs(data: ExportDataRow[], date: string): boolean {
  if (!data.length) {
    return false;
  }

  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i].date === date) {
      return true;
    }

    if (data[i].date !== null) {
      return false;
    }

    continue;
  }
}

runMain(main);
