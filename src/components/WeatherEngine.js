import React, { Component } from "react";

import WeatherCard from "./WeatherCard/Components";

// Step -1:
//  useEffect(()=>{function},[variable]) ----> this function occurs when the variable specified is changes
//  we set the location variable as a buffer so that when the program is run it will show the weather data of the default location
// Step -2:
//  the async data function is called. This processes the get request from the URL and assigns the responds to the correct variable.
// Step - 3:
//  The return API will be passed to other components in the weather component and display the weather.
// Step - 4:
//

class WeatherEninge extends Component {
  constructor() {
    super();
    this.state = {
      location: "Ottawa",
      loading: false,
      error: false,
      query: "",
      weather: {
        temp: 7,
        city: "Ottawa",
        condition: "Sunny",
        country: "CA",
      },
    };
  }

  setError = (e) => {
    this.setState({
      error: e,
    });
  };
  setLoading = (l) => {
    this.setState({
      loading: l,
    });
  };
  setQuery = (q) => {
    this.setState({
      query: q,
    });
  };
  setWeather = (w) => {
    this.setState({
      weather: w,
    });
  };
  // ask shams what is async function
  // an async function is used when we want to wait for a response,
  //creates a temporary function that will be excecuted when the response is 'fullfilled'
  // the promise object (our data) contains the response
  // data().then() : is the used to assign the object to a variable , after the promise is fullfilled
  getWeather = async (q) => {
    this.setQuery("");
    this.setLoading(true);
    try {
      const apiRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${q}&units=metric&appid=228bc45340cf8dbd8c0d676703f6892b`
      );
      const resJSON = await apiRes.json();
      this.setWeather({
        temp: resJSON.main.temp,
        city: resJSON.name,
        condition: resJSON.weather[0]["main"],
        country: resJSON.sys.country,
      });
    } catch (error) {
      this.setError(true);
    }

    this.setLoading(false);
  };

  handleSearch = (e) => {
    e.preventDefault();

    this.getWeather(this.state.query);
  };

  //Step 1
  componentDidMount() {
    this.getWeather("Dhaka");
    console.log("componentDidMount");
  }
  render() {
    const { loading, error, weather, query } = this.state;
    console.log("rendered");
    return (
      //Step 3
      //Step - 4 (form)
      //conditional rendering
      <div>
        {!loading && !error ? (
          <div>
            <WeatherCard
              temp={weather.temp}
              condition={weather.condition}
              city={weather.city}
              country={weather.country}
            />

            <form onSubmit={(e) => this.handleSearch(e)}>
              <input
                required
                value={query}
                onChange={(e) => this.setQuery(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
          </div>
        ) : loading ? (
          <div style={{ color: "black" }}>Loading</div>
        ) : !loading && error ? (
          <div style={{ color: "black" }}>
            There has been an error! <br />
            <button onClick={() => this.setError(false)}>Reset!</button>
          </div>
        ) : null}
      </div>
    );
  }
}

export default WeatherEninge;
// The setQuery(e.target.value) is
