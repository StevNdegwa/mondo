import { FC } from "react";
import Image from "next/image";
import { Definitions, Flag, CountryDetailsWrapper } from "./styles";
import flagIcon from "../../images/flag-icon.jpg";

export interface CountryDetailsProps {
  data?: {
    capital: string;
    code: string;
    currencyCodes: string;
    flagImageUri: string;
    name: string;
    numRegions: string;
    wikiDataId: string;
  };
}

export const CountryDetails: FC<CountryDetailsProps> = ({ data }) => {
  return (
    <CountryDetailsWrapper>
      <h3>
        {data?.name}, {data?.code}
      </h3>
      <div>
        <Definitions>
          <dl>
            <dt>Capital city</dt>
            <dd>{data?.capital}</dd>
            <dt>Currency codes</dt>
            <dd>{`${data?.currencyCodes}`}</dd>
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
        </Definitions>
        <Flag className="flag">
          <div>
            <Image
              alt={`${data?.name} Flag`}
              src={`${data?.flagImageUri}`}
              width={2}
              height={1}
              placeholder="blur"
              blurDataURL={flagIcon.src}
            />
          </div>
        </Flag>
      </div>
    </CountryDetailsWrapper>
  );
};
