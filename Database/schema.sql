DROP TABLE IF EXISTS "earthquakes" CASCADE;
DROP TABLE IF EXISTS "code" CASCADE;
DROP TABLE IF EXISTS "eruptions" CASCADE;
DROP TABLE IF EXISTS "emissions" CASCADE;

CREATE TABLE "earthquakes" (
    "date" Date   NOT NULL,
    "latitude" Decimal(8,6)   NOT NULL,
    "longitude" Decimal(9,6)   NOT NULL,
    "depth" numeric   NOT NULL,
    "mag" numeric   NOT NULL,
    "id" varchar(30)   NOT NULL,
    "place" varchar(500),
    CONSTRAINT "pk_earthquakes" PRIMARY KEY (
        "id"
     )
);

CREATE TABLE "code" (
    "VolcanoNumber" INT   NOT NULL,
    "VolcanoName" varchar(50)   NOT NULL,
    CONSTRAINT "pk_Code" PRIMARY KEY (
        "VolcanoNumber","VolcanoName"
     )
);

CREATE TABLE "emissions" (
    "FID" varchar(100)   NOT NULL,
    "VolcanoNumber" INT   NOT NULL,
    "VolcanoName" varchar(50)   NOT NULL,
    "SO2_Kilotons" Numeric   NOT NULL,
    "StartDate" Date   NOT NULL,
    "EndDate" Date   NOT NULL,
    "Emission_ID" INT   NOT NULL PRIMARY KEY
   
);

CREATE TABLE "eruptions" (
    "FID" varchar(100)   NOT NULL,
    "VolcanoNumber" INT   NOT NULL,
    "VolcanoName" varchar(50)   NOT NULL,
    "ExplosivityIndexMax" INT   NOT NULL,
    "StartDate" Date   NOT NULL,
    "StartDateYear" INT   NOT NULL,
    "StartDateMonth" INT   NOT NULL,
    "StartDateDay" INT   NOT NULL,
    "EndDate" Date   ,
    "EndDateYear" INT   ,
    "EndDateMonth" INT  ,
    "EndDateDay" INT   ,
    "ContinuingEruption" boolean   NOT NULL,
    "LatitudeDecimal" Decimal(8,6)   NOT NULL,
    "LongitudeDecimal" Decimal(9,6)   NOT NULL,
    "Activity_ID" INT   NOT NULL PRIMARY KEY
   
);

ALTER TABLE "emissions" ADD CONSTRAINT "fk_emissions_VolcanoNumber_VolcanoName" FOREIGN KEY("VolcanoNumber", "VolcanoName")
REFERENCES "code" ("VolcanoNumber", "VolcanoName");

ALTER TABLE "eruptions" ADD CONSTRAINT "fk_eruptions_VolcanoNumber_VolcanoName" FOREIGN KEY("VolcanoNumber", "VolcanoName")
REFERENCES "code" ("VolcanoNumber", "VolcanoName");

