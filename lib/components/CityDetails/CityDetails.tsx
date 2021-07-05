import { FC } from "react";
import numeral from "numeral";
import { CityDefinitions, CityDetailsWrapper } from "./styles";

export interface CityDetailsProps {
  data?: {
    city: string;
    country: string;
    countryCode: string;
    latitude: number;
    longitude: number;
    name: string;
    population: string;
    region: string;
    regionCode: string;
    wikiDataId: string;
  };
}

export const CityDetails: FC<CityDetailsProps> = ({ data }) => {
  return (
    <CityDetailsWrapper>
      <h3>{data?.name},</h3>
      <div>
        <CityDefinitions>
          <dl>
            <dt>Country</dt>
            <dd>
              {data?.country}, {data?.countryCode}{" "}
            </dd>
            <dt>Location</dt>
            <dd>
              [{`${data?.longitude}`}, {`${data?.longitude}`}]
            </dd>
            <dt>Population</dt>
            <dd>{numeral(data?.population || 0).format("0, 0")}</dd>
          </dl>
          <div>
            <a
              href={`https://www.wikidata.org/wiki/${data?.wikiDataId}`}
              target="_blank"
              rel="noreferrer"
            >
              More Info...
            </a>
          </div>
        </CityDefinitions>
      </div>
    </CityDetailsWrapper>
  );
};
