"use client";
import useCountries from "@/hooks/useCountries";
import dynamic from "next/dynamic";
import React, { useMemo, useState } from "react";
import { set } from "react-hook-form";
import Select from "react-select";
import { Latlng } from "./addnewoffre";

export type CountrySelectValue = {
  id?: string;
  userId?: string;
  flag: string;
  label: string;
  value: string;
  region: string;
  lalng: number[];
};
interface CountrySelectProps {
  value?: Latlng;
  onChange: (value: number[]) => void;
}
export const CountrySelect = ({ value, onChange }: CountrySelectProps) => {
  const [shouldrender, setShouldRender] = useState(false);
  const [center, setCenter] = useState<number[]>([]);
  console.log("center from country select", center);
  const onCenterChange = (centerr: number[]) => {
    // i want you to change onlt the lat and lng beacause the center is an abject of label value flag and an array of lat and lng
    // setCenter({ lalng: centerr });
    //console.log("the center has been changed", centerr);
    // const newCenter = { ...center, lalng: centerr };
    onChange(centerr);
    //console.log("new center", newCenter);
  };
  //   const defaultCountry = {
  //     const centerr = {
  //   lat: 51.505,
  //   lng: -0.09,
  // };

  const Map = useMemo(
    () =>
      dynamic(() => import("./Map"), {
        loading: () => <p>loading...</p>,
        ssr: false,
      }),
    []
  );

  const { getAll } = useCountries();
  return (
    <div>
      <div className=" mb-3">
        <Select
          options={getAll()}
          className="z-40"
          placeholder="Select your country"
          onChange={(valuee) => {
            // onChange(valuee as CountrySelectValue);
            // @ts-ignore
            setCenter(valuee as CountrySelectValue);
            // console.log("value1", center);
            // console.log("value", value?.lalng);
          }}
          formatOptionLabel={(option) => (
            <div className="flex flex-row items-center gap-3">
              <div>{option.flag}</div>
              <div>
                {option.label},
                <span className="text-gray-400">{option.region}</span>
              </div>
            </div>
          )}
        />
      </div>
      {/* @ts-ignore */}
      <Map center={center?.lalng} onChange={onCenterChange} />
    </div>
  );
};
