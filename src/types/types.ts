export interface Country {
  flags: CountryFlag;
  name: CountryName;
  capital: string[];
  altSpellings: string[];
  region: Region;
  borders: string[];
  subregion: string;
  currencies: { [key: string]: { name: string; symbol: string } };
  languages: { [key: string]: string };
  tld: string[];
  population: number;
}

export interface CountryFlag {
  png: string;
  svg: string;
}

export interface CountryName {
  common: string;
  official: string;
  nativeName: { [key: string]: NativeName };
}

export interface NativeName {
  official: string;
  common: string;
}

export enum Region {
  Africa = "Africa",
  Americas = "Americas",
  Antarctic = "Antarctic",
  Asia = "Asia",
  Europe = "Europe",
  Oceania = "Oceania",
}
