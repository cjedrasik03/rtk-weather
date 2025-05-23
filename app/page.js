'use client';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Sparklines, SparklinesLine, SparklinesReferenceLine, SparklinesSpots } from 'react-sparklines';
import { getLocation, fetchWeather } from './store/slices/getWeather'; 

export default function App() {
  // State for the city search input field
  const [inputValue, setInputValue] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  // Hook for dispatching Redux actions
  const dispatch = useDispatch();

  // Calculate the avg. temp 
  const getDailyAverages = (field) => {
  if (!weatherData?.list?.length) return [];

  const dailyAverages = [];

  for (let day = 0; day < 5; day++) {
    const start = day * 8;
    const end = start + 8;
    const daySlice = weatherData.list.slice(start, end);

    const values = daySlice.map(item => item.main[field]);
    const sum = values.reduce((acc, curr) => acc + curr, 0);
    const avg = sum / values.length;

    dailyAverages.push(avg.toFixed(1));
  }
  return dailyAverages;
  
};

const dataOrganized = weatherData?.list?.length > 0
  ? {
      temp: getDailyAverages('temp'),
      humidity: getDailyAverages('humidity'),
      pressure: getDailyAverages('pressure'),
    }
  : null;

  // Handles search button click
  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent page refresh on form submit
    console.log(inputValue);
    try {
      // Get lat/lon from city name (1st thunk)
      const location = await dispatch(getLocation(inputValue)).unwrap();

      // Fetch weather data using coordinates (2nd thunk)
      const rawData = await dispatch(fetchWeather({ lat: location.lat, lon: location.lon })).unwrap();
      
      setWeatherData(rawData);

    } catch (error) {
      console.error('Error fetching weather:', error); // Error logging
    }
  };

  return (
    <>
      <Container fluid className="primaryBackground min-vh-100 py-5">
        <Row className="justify-content-center mb-4">
          <Col xs={12} md={6} lg={6}>
            <div className="bg-primary-subtle border border-primary-subtle rounded-4 p-4">
              <Row className="g-2 align-items-center">
                <Col xs={12} md={9}>
                  <input
                    className="form-control form-control-lg"
                    type="text"
                    placeholder="Search a city"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                </Col>
                <Col xs={12} md={3}>
                  <button
                    type="submit"
                    onClick={handleSearch}
                    className="btn btn-primary btn-lg w-100"
                  >
                    Search
                  </button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        {/* Forecast display */}
        <Row className="justify-content-center">
          <Col md={8}>
            <Container className="bg-primary-subtle border border-primary-subtle rounded-4 p-3 mb-2">
              <div className="p-2 text-center fw-bold text-capitalize">{inputValue}</div>
                {weatherData?.list?.length > 0 && (
                <Row className="d-flex justify-content-center align-items-center">      

              {/* Temp. */}      

                  <Col className="m-3">
                      <Sparklines
                      data={dataOrganized.temp}
                      width={100}
                      height={35}
                      >
                      <SparklinesLine style={{ fill: "#002ea1" }} />
                      <SparklinesReferenceLine type="mean" />
                      </Sparklines>
                      <p className='text-sm text-gray-700 text-center fw-bold'>
                        Temperature °F:
                      </p>
                    </Col>

              {/* Humi. */}  

                  <Col className="m-3">
                      <Sparklines
                      data={dataOrganized.humidity}
                      width={100}
                      height={35}
                      >
                      <SparklinesLine style={{ fill: "#002ea1" }} />
                      <SparklinesReferenceLine type="mean" />
                      </Sparklines>
                      <p className='text-sm text-gray-700 text-center fw-bold'>
                        Humidity %
                      </p>
                    </Col>

              {/* Pres. */}    

                  <Col className="m-3">
                      <Sparklines
                      data={dataOrganized.pressure}
                      width={100}
                      height={35}
                      >
                      <SparklinesLine style={{ fill: "#002ea1" }} />
                      <SparklinesReferenceLine type="mean" />
                      </Sparklines>
                      <p className='text-sm text-gray-700 text-center fw-bold'>
                        Pressure hPa
                      </p>
                    </Col>
                </Row>
              )}
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
}
