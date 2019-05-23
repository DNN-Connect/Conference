import * as React from "react";
import * as Models from "../Models/";

interface ICountryDropdownProps {
  module: Models.IAppModule;
  countries: Models.ICountry[];
  value: string;
  onChange: (newValue: string) => void;
}

interface ICountryDropdownState {}

export default class CountryDropdown extends React.Component<
  ICountryDropdownProps,
  ICountryDropdownState
> {
  constructor(props: ICountryDropdownProps) {
    super(props);
    this.state = {};
  }

  public render(): JSX.Element {
    var options = this.props.countries.map(c => {
      return (
        <option key={c.Id} value={c.Id.toString()}>
          {c.Name}
        </option>
      );
    });
    return (
      <select
        value={this.props.value || ""}
        onChange={e => this.props.onChange(e.target.value)}
        className="form-control"
      >
        <option value="">Select ...</option>
        {options}
      </select>
    );
  }
}
