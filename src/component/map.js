import React, { Component} from 'react';
import ReactMapboxGl, {Layer, Feature, Popup, ScaleControl, ZoomControl, RotationControl} from "react-mapbox-gl";
import axios from 'axios';

const Box = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MapboxAccessToken
});


const lineLayout = {
    'line-cap': 'round',
    'line-join': 'round'
};

const linePaint = {
    'line-color': '#0000FF',
    'line-width': 4,
    'line-opacity': 0.5
};

const circleStyle = {
    'circle-radius': 8,
    'circle-color': '#E54E52',
    'circle-opacity': .9
};


// MA AT
let maatStyle = "mapbox://styles/thirdhiker/cjygbub780azk1cpo76i0ywmu";
let mamsStyle = "mapbox://styles/thirdhiker/cjygh1ocl0fvx1cl9x756k7pi";
let vtltStyle = "mapbox://styles/thirdhiker/cjxn7fpvr2hhc1cs1678kqky6";

let apiUrl = 'https://api.thirdhiker.com'; // http://localhost:8080

let startDate = "2019-08-01";

class Map extends Component {

  state = {locations: null, selectedLocation: null};


    render() {

    if(!this.state.locations)
      return <div></div>;



    let locationFeatures = this.state.locations.map(location =>
        <Feature key={location._id} coordinates={[location.lng, location.lat]} onClick={() => this.showPopup(location)} />
    );

    let lineLocations = this.state.locations.map(
        point => [point.lng, point.lat]
    );

      let popup = this.state.selectedLocation && <Popup anchor={`bottom`} offset={5}
          coordinates={[this.state.selectedLocation.lng,this.state.selectedLocation.lat]}>
          <div>{this.formatDate(this.state.selectedLocation.timestamp)}</div>
      </Popup>;

    return (
      <Box
        style={vtltStyle}
        containerStyle={{
          height: "100%",
          width: "100%"
        }}
        center={this.state.locations[this.state.locations.length - 1]}
        onClick={() => this.hidePopup()}
      >
          <ScaleControl />
          <ZoomControl />
          <RotationControl style={{ top: 80 }} />

          <Layer type="line" layout={lineLayout} paint={linePaint}>
              <Feature coordinates={lineLocations} />
          </Layer>

          <Layer type="circle" paint={circleStyle}>
              {locationFeatures}
          </Layer>

          {popup}

      </Box>
    );
  }

    formatDate(date) {
        let secondsFromEpoch = date;
        date = new Date(0);
        date.setUTCSeconds(secondsFromEpoch);

        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getMonth()+1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
    }

  componentDidMount() {
      // 2019-07-midstate
    axios.get(`${apiUrl}/api/trips/custom?startDate=${startDate}`).then(
        res => {
          const locations = res.data;
          // console.log(locations);
          this.setState({locations: locations});
        }
    );
  }

  showPopup(location){
      this.setState({selectedLocation: location});
  }

  hidePopup(){
      this.setState({selectedLocation: null});
  }



}

export default Map;