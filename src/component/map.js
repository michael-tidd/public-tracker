import React, { Component} from 'react';
import ReactMapboxGl, {Layer, Feature, Popup, Marker, ScaleControl, ZoomControl, RotationControl} from "react-mapbox-gl";
import axios from 'axios';
import styled from 'styled-components';

const Box = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MapboxAccessToken
});

let landmarks = [{"name":"Massachusetts","lat":42.74404,"lon":-73.15552,"totalDst":0,"elapsedTime":0,"splitDistance":0,"splitTime":null,"splitElevationGain":null,"splitElevationDrop":null,"date":"8/22/2019  6:12 am","unixTime":1566454320,"splitSpeed":null},{"name":"Harmon Hill","lat":42.87091,"lon":-73.13233,"totalDst":12.5,"elapsedTime":0.2,"splitDistance":12.5,"splitElevationGain":2600,"splitElevationDrop":-2600,"splitTime":4.4,"splitSpeed":2.9,"date":"8/22/2019  11:27 am","unixTime":1566473220},{"name":"Rt 9","lat":42.88491,"lon":-73.11581,"totalDst":14.3,"elapsedTime":0.2,"splitDistance":1.8,"splitElevationGain":100,"splitElevationDrop":-1100,"splitTime":0.6,"splitSpeed":3,"date":"8/22/2019  12:10 pm","unixTime":1566475800},{"name":"Glastenbury Mountain","lat":42.97823,"lon":-73.07129,"totalDst":24.7,"elapsedTime":0.4,"splitDistance":10.4,"splitElevationGain":3700,"splitElevationDrop":-1300,"splitTime":3.9,"splitSpeed":2.7,"date":"8/22/2019  4:52 pm","unixTime":1566492720},{"name":"Stratton Arlington Road","lat":43.06107,"lon":-72.96841,"totalDst":36.9,"elapsedTime":0.7,"splitDistance":12.2,"splitElevationGain":1700,"splitElevationDrop":-3200,"splitTime":4.2,"splitSpeed":2.9,"date":"8/22/2019  9:55 pm","unixTime":1566510900},{"name":"Stratton Mountain","lat":43.08575,"lon":-72.92532,"totalDst":40.7,"elapsedTime":0.7,"splitDistance":3.8,"splitElevationGain":1700,"splitElevationDrop":0,"splitTime":1.4,"splitSpeed":2.7,"date":"8/22/2019  11:38 pm","unixTime":1566517080},{"name":"VT 11 and 30","lat":43.20678,"lon":-72.97069,"totalDst":54.4,"elapsedTime":1,"splitDistance":13.7,"splitElevationGain":1700,"splitElevationDrop":-3800,"splitTime":4.7,"splitSpeed":2.9,"date":"8/23/2019  5:14 am","unixTime":1566537240},{"name":"Bromley Mountain","lat":43.22781,"lon":-72.93968,"totalDst":57.9,"elapsedTime":1,"splitDistance":3.5,"splitElevationGain":1400,"splitElevationDrop":0,"splitTime":1.3,"splitSpeed":2.8,"date":"8/23/2019  6:44 am","unixTime":1566542640},{"name":"VT 21","lat":43.25786,"lon":-72.93885,"totalDst":59.9,"elapsedTime":1.1,"splitDistance":2,"splitElevationGain":200,"splitElevationDrop":-1000,"splitTime":0.8,"splitSpeed":2.6,"date":"8/23/2019  7:40 am","unixTime":1566546000},{"name":"Peru Peak","lat":43.29433,"lon":-72.93797,"totalDst":63.2,"elapsedTime":1.1,"splitDistance":3.3,"splitElevationGain":1300,"splitElevationDrop":-300,"splitTime":1.3,"splitSpeed":2.6,"date":"8/23/2019  9:10 am","unixTime":1566551400},{"name":"Big Branch Shelter","lat":43.36398,"lon":-72.94642,"totalDst":70.9,"elapsedTime":1.3,"splitDistance":7.7,"splitElevationGain":500,"splitElevationDrop":-2500,"splitTime":2.6,"splitSpeed":3,"date":"8/23/2019  12:18 pm","unixTime":1566562680},{"name":"White Rocks Mountain","lat":43.43203,"lon":-72.94239,"totalDst":78.5,"elapsedTime":1.4,"splitDistance":7.6,"splitElevationGain":1400,"splitElevationDrop":-400,"splitTime":2.6,"splitSpeed":3,"date":"8/23/2019  3:23 pm","unixTime":1566573780},{"name":"VT 140","lat":43.45538,"lon":-72.93468,"totalDst":80.5,"elapsedTime":1.4,"splitDistance":2,"splitElevationGain":200,"splitElevationDrop":-1600,"splitTime":0.8,"splitSpeed":2.5,"date":"8/23/2019  4:21 pm","unixTime":1566577260},{"name":"Clarendon Gorge","lat":43.51966,"lon":-72.9259,"totalDst":86.7,"elapsedTime":1.5,"splitDistance":6.2,"splitElevationGain":1600,"splitElevationDrop":-1900,"splitTime":2.4,"splitSpeed":2.6,"date":"8/23/2019  7:12 pm","unixTime":1566587520},{"name":"Mount Killington","lat":43.60585,"lon":-72.82246,"totalDst":98.2,"elapsedTime":1.8,"splitDistance":11.5,"splitElevationGain":4400,"splitElevationDrop":-1400,"splitTime":4.5,"splitSpeed":2.5,"date":"8/24/2019  12:38 am","unixTime":1566607080},{"name":"Rolston Rest Shelter","lat":43.71285,"lon":-72.86135,"totalDst":109.5,"elapsedTime":2,"splitDistance":11.3,"splitElevationGain":1800,"splitElevationDrop":-3500,"splitTime":3.9,"splitSpeed":2.9,"date":"8/24/2019  5:19 am","unixTime":1566623940},{"name":"Telephone Gap","lat":43.75979,"lon":-72.90177,"totalDst":115.3,"elapsedTime":2.1,"splitDistance":5.8,"splitElevationGain":1800,"splitElevationDrop":-1700,"splitTime":2.3,"splitSpeed":2.6,"date":"8/24/2019  8:02 am","unixTime":1566633720},{"name":"Brandon Gap","lat":43.83988,"lon":-72.96715,"totalDst":124.4,"elapsedTime":2.2,"splitDistance":9.1,"splitElevationGain":1800,"splitElevationDrop":-2000,"splitTime":3.3,"splitSpeed":2.8,"date":"8/24/2019  11:59 am","unixTime":1566647940},{"name":"Cape Lookoff Mountain","lat":43.85562,"lon":-72.97261,"totalDst":126.2,"elapsedTime":2.3,"splitDistance":1.8,"splitElevationGain":1300,"splitElevationDrop":-200,"splitTime":1,"splitSpeed":1.8,"date":"8/24/2019  1:10 pm","unixTime":1566652200},{"name":"Sucker Brook Shelter","lat":43.89336,"lon":-72.97014,"totalDst":129.8,"elapsedTime":2.4,"splitDistance":3.6,"splitElevationGain":600,"splitElevationDrop":-1500,"splitTime":1.3,"splitSpeed":2.7,"date":"8/24/2019  2:44 pm","unixTime":1566657840},{"name":"Worth Mountain","lat":43.9099,"lon":-72.96374,"totalDst":131.6,"elapsedTime":2.4,"splitDistance":1.8,"splitElevationGain":900,"splitElevationDrop":-100,"splitTime":0.8,"splitSpeed":2.2,"date":"8/24/2019  3:42 pm","unixTime":1566661320},{"name":"Middlebury Gap","lat":43.93698,"lon":-72.95001,"totalDst":133.3,"elapsedTime":2.4,"splitDistance":1.7,"splitElevationGain":300,"splitElevationDrop":-1400,"splitTime":1,"splitSpeed":1.8,"date":"8/24/2019  4:51 pm","unixTime":1566665460},{"name":"Mount Wilson","lat":44.00657,"lon":-72.92155,"totalDst":142.1,"elapsedTime":2.7,"splitDistance":8.8,"splitElevationGain":3000,"splitElevationDrop":-1400,"splitTime":4.4,"splitSpeed":2,"date":"8/24/2019  10:11 pm","unixTime":1566684660},{"name":"Lincoln Gap","lat":44.09477,"lon":-72.92805,"totalDst":151.6,"elapsedTime":2.9,"splitDistance":9.5,"splitElevationGain":2200,"splitElevationDrop":-3500,"splitTime":4.5,"splitSpeed":2.1,"date":"8/25/2019  3:34 am","unixTime":1566704040},{"name":"Mount Abraham","lat":44.12027,"lon":-72.93607,"totalDst":154.2,"elapsedTime":3,"splitDistance":2.6,"splitElevationGain":1800,"splitElevationDrop":-200,"splitTime":1.6,"splitSpeed":1.6,"date":"8/25/2019  5:33 am","unixTime":1566711180},{"name":"Mount Ellen","lat":44.16044,"lon":-72.92941,"totalDst":157.9,"elapsedTime":3.1,"splitDistance":3.7,"splitElevationGain":900,"splitElevationDrop":-900,"splitTime":1.7,"splitSpeed":2.1,"date":"8/25/2019  7:38 am","unixTime":1566718680},{"name":"Appalachian Gap","lat":44.21074,"lon":-72.93165,"totalDst":163.2,"elapsedTime":3.2,"splitDistance":5.3,"splitElevationGain":600,"splitElevationDrop":-2300,"splitTime":2.4,"splitSpeed":2.3,"date":"8/25/2019  10:27 am","unixTime":1566728820},{"name":"Mount Ethan Allen","lat":44.29395,"lon":-72.88401,"totalDst":172.8,"elapsedTime":3.4,"splitDistance":9.6,"splitElevationGain":3300,"splitElevationDrop":-2000,"splitTime":4.8,"splitSpeed":2,"date":"8/25/2019  4:13 pm","unixTime":1566749580},{"name":"Camels Hump","lat":44.31958,"lon":-72.8863,"totalDst":175.7,"elapsedTime":3.5,"splitDistance":2.9,"splitElevationGain":1500,"splitElevationDrop":-1100,"splitTime":2.1,"splitSpeed":1.4,"date":"8/25/2019  6:46 pm","unixTime":1566758760},{"name":"Rt 2","lat":44.38132,"lon":-72.91654,"totalDst":184.5,"elapsedTime":3.7,"splitDistance":8.8,"splitElevationGain":600,"splitElevationDrop":-4400,"splitTime":4.5,"splitSpeed":2,"date":"8/26/2019  12:09 am","unixTime":1566778140},{"name":"Bolton Mountain","lat":44.44862,"lon":-72.83982,"totalDst":194.7,"elapsedTime":4,"splitDistance":10.2,"splitElevationGain":4400,"splitElevationDrop":-1000,"splitTime":5.7,"splitSpeed":1.8,"date":"8/26/2019  7:03 am","unixTime":1566802980},{"name":"Nebraska Notch","lat":44.48773,"lon":-72.83667,"totalDst":199.3,"elapsedTime":4.2,"splitDistance":4.6,"splitElevationGain":700,"splitElevationDrop":-2600,"splitTime":2.5,"splitSpeed":1.9,"date":"8/26/2019  10:01 am","unixTime":1566813660},{"name":"Mount Mansfield","lat":44.54358,"lon":-72.81462,"totalDst":204.8,"elapsedTime":4.4,"splitDistance":5.5,"splitElevationGain":3300,"splitElevationDrop":-700,"splitTime":3.9,"splitSpeed":1.4,"date":"8/26/2019  2:41 pm","unixTime":1566830460},{"name":"Smugglers Notch","lat":44.53713,"lon":-72.79082,"totalDst":209.3,"elapsedTime":4.5,"splitDistance":4.5,"splitElevationGain":0,"splitElevationDrop":-2800,"splitTime":2.3,"splitSpeed":2,"date":"8/26/2019  5:23 pm","unixTime":1566840180},{"name":"Madonna Mountain","lat":44.56136,"lon":-72.75846,"totalDst":212.4,"elapsedTime":4.6,"splitDistance":3.1,"splitElevationGain":2700,"splitElevationDrop":-600,"splitTime":3.1,"splitSpeed":1,"date":"8/26/2019  9:05 pm","unixTime":1566853500},{"name":"Whiteface Mountain","lat":44.58221,"lon":-72.73992,"totalDst":215.2,"elapsedTime":4.7,"splitDistance":2.8,"splitElevationGain":1200,"splitElevationDrop":-1100,"splitTime":1.8,"splitSpeed":1.6,"date":"8/26/2019  11:14 pm","unixTime":1566861240},{"name":"Rt 15","lat":44.64507,"lon":-72.72822,"totalDst":222.2,"elapsedTime":4.9,"splitDistance":7,"splitElevationGain":200,"splitElevationDrop":-3400,"splitTime":3.5,"splitSpeed":2,"date":"8/27/2019  3:27 am","unixTime":1566876420},{"name":"Laraway Mountain","lat":44.72661,"lon":-72.71054,"totalDst":231.2,"elapsedTime":5.1,"splitDistance":9,"splitElevationGain":3700,"splitElevationDrop":-1500,"splitTime":4,"splitSpeed":2.3,"date":"8/27/2019  8:13 am","unixTime":1566893580},{"name":"VT 118","lat":44.76364,"lon":-72.58745,"totalDst":243.2,"elapsedTime":5.3,"splitDistance":12,"splitElevationGain":2300,"splitElevationDrop":-3700,"splitTime":4.8,"splitSpeed":2.5,"date":"8/27/2019  1:57 pm","unixTime":1566914220},{"name":"Belvidere Mountain","lat":44.77389,"lon":-72.55328,"totalDst":245.8,"elapsedTime":5.4,"splitDistance":2.6,"splitElevationGain":2000,"splitElevationDrop":0,"splitTime":1.3,"splitSpeed":2,"date":"8/27/2019  3:33 pm","unixTime":1566919980},{"name":"Haystack Mountain","lat":44.82395,"lon":-72.53864,"totalDst":251.3,"elapsedTime":5.5,"splitDistance":5.5,"splitElevationGain":1600,"splitElevationDrop":-1600,"splitTime":2.3,"splitSpeed":2.4,"date":"8/27/2019  6:15 pm","unixTime":1566929700},{"name":"VT 58","lat":44.84143,"lon":-72.52519,"totalDst":254.7,"elapsedTime":5.6,"splitDistance":3.4,"splitElevationGain":100,"splitElevationDrop":-1400,"splitTime":1.2,"splitSpeed":2.7,"date":"8/27/2019  7:45 pm","unixTime":1566935100},{"name":"Buchanan Mountain","lat":44.87926,"lon":-72.50892,"totalDst":257,"elapsedTime":5.7,"splitDistance":2.3,"splitElevationGain":1800,"splitElevationDrop":-700,"splitTime":1.8,"splitSpeed":1.3,"date":"8/27/2019  9:52 pm","unixTime":1566942720},{"name":"RT 242","lat":44.91265,"lon":-72.50413,"totalDst":260,"elapsedTime":5.7,"splitDistance":3,"splitElevationGain":800,"splitElevationDrop":-1500,"splitTime":1.2,"splitSpeed":2.4,"date":"8/27/2019  11:22 pm","unixTime":1566948120},{"name":"Jay Peak","lat":44.92414,"lon":-72.52561,"totalDst":261.7,"elapsedTime":5.8,"splitDistance":1.7,"splitElevationGain":1600,"splitElevationDrop":0,"splitTime":1,"splitSpeed":1.6,"date":"8/28/2019  12:36 am","unixTime":1566952560},{"name":"VT 105","lat":44.98664,"lon":-72.504,"totalDst":269.4,"elapsedTime":5.9,"splitDistance":7.7,"splitElevationGain":1600,"splitElevationDrop":-3400,"splitTime":3.1,"splitSpeed":2.5,"date":"8/28/2019  4:18 am","unixTime":1566965880},{"name":"Canada","lat":45.00845,"lon":-72.48819,"totalDst":272,"elapsedTime":6,"splitDistance":2.6,"splitElevationGain":700,"splitElevationDrop":-700,"splitTime":1.1,"splitSpeed":2.4,"date":"8/28/2019  5:38 am","unixTime":1566970680}];

const lineLayout = {
    'line-cap': 'round',
    'line-join': 'round'
};

const linePaint = {
    'line-color': '#000000',
    'line-width': 3,
    'line-opacity': 0.9
};

const circleStyle = {
    'circle-radius': 6,
    'circle-color': '#000000',
    'circle-opacity': .7
};

const currentStyle = {
    'circle-radius': 10,
    'circle-color': '#000000',
    'circle-opacity': 1
};

const landmarkStyle = {
    'circle-radius': 8,
    'circle-color': '#4c652e',
    'circle-opacity': 1
};

const LandmarkMark = styled.div`
background: rgba(76,101,46,.3);
  width: 14px;
  height: 14px;
  border: 4px solid rgba(76,101,46,.7);
  cursor: pointer;
  border-radius: 10%;
`;

const TrackMark = styled.div`
border-radius: 50%;
background: rgba(0,0,0,.5);
  width: 8px;
  height: 8px;
  border: 3px solid #333333;
  cursor: pointer;
`;


// MA AT
// let maatStyle = "mapbox://styles/thirdhiker/cjygbub780azk1cpo76i0ywmu";
// let mamsStyle = "mapbox://styles/thirdhiker/cjygh1ocl0fvx1cl9x756k7pi";
let vtltStyle = "mapbox://styles/thirdhiker/cjxn7fpvr2hhc1cs1678kqky6";

let apiUrl = 'https://api.thirdhiker.com'; // http://localhost:8080

let startDate = "2019-08-01";

class Map extends Component {

  state = {landmarks: null, locations: null, selectedLocation: null, selectedLandmark: null};


    render() {


    if(!this.state.locations)
      return <div></div>;

    let locationFeatures = this.state.locations.slice(0,this.state.locations.length -1).map(location =>
        <Feature key={location._id} coordinates={[location.lng, location.lat]} onClick={() => this.showLocationPopup(location)} />
    );

    let currentLocationFeatures = this.state.locations.slice(this.state.locations.length -1).map(location =>
      <Feature key={location._id} coordinates={[location.lng, location.lat]} onClick={() => this.showLocationPopup(location)} />
    );

    let lineLocations = this.state.locations.map(
        point => [point.lng, point.lat]
    );

      let selectedLocationPopup = this.state.selectedLocation && <Popup anchor={`bottom`} offset={5}
          coordinates={[this.state.selectedLocation.lng,this.state.selectedLocation.lat]}>
        <div>
          <div>arrived at:</div>
          <div style={{'fontWeight': 'bold', 'fontSize': '16px' }}>{this.formatDate(this.state.selectedLocation.timestamp)}</div>
        </div>
      </Popup>;

        let selectedLandmarkPopup = this.state.selectedLandmark && <Popup anchor={`bottom`} offset={5}
                                                                          coordinates={[this.state.selectedLandmark.lon,this.state.selectedLandmark.lat]}>
            <div>
                <div  style={{'fontWeight': 'bold', 'fontSize': '18px', 'textTransform': 'uppercase', 'marginBottom': '2px' }}>{this.state.selectedLandmark.name}</div>
                <div>distance:</div>
              <div style={{'fontWeight': 'bold', 'fontSize': '14px' }}>{this.state.selectedLandmark.totalDst} miles</div>
                <div>estimated time of departure:</div>
                <div style={{'fontWeight': 'bold', 'fontSize': '16px' }}>{this.formatDate(this.state.selectedLandmark.unixTime)}</div>
            </div>
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

        {this.state.landmarks.map(landmark => {
          return <Marker anchor="center"  coordinates={[landmark.lon, landmark.lat]} onClick={() => this.showLandmarkPopup(landmark)}>
            <LandmarkMark />
          </Marker>
        })}

        <Layer type="line" layout={lineLayout} paint={linePaint}>
          <Feature coordinates={lineLocations} />
        </Layer>

        {this.state.locations.slice(0,this.state.locations.length -1).map(landmark => {
          return <Marker anchor="center" coordinates={[landmark.lng, landmark.lat]} onClick={() => this.showLocationPopup(landmark)}>
            <TrackMark />
          </Marker>
        })}




          <Layer type="circle" paint={currentStyle}>
              {currentLocationFeatures}
          </Layer>


          {selectedLocationPopup}
          {selectedLandmarkPopup}

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
        return strTime + " on " + (date.getMonth()+1) + "/" + date.getDate();
    }

  componentDidMount() {
      if(this.props.start_date){
          startDate = this.props.start_date;
      }

      // 2019-07-midstate
    axios.get(`${apiUrl}/api/trips/custom?startDate=${startDate}`).then(
        res => {
          const locations = res.data;
          // console.log(locations);
          this.setState({locations: locations, landmarks: landmarks});
          this.showLocationPopup(this.state.locations.slice(this.state.locations.length -1)[0]);

        }
    );
  }

    showLandmarkPopup(location){
        this.setState({selectedLandmark: location});
    }

  showLocationPopup(location){
      this.setState({selectedLocation: location});
  }

  hidePopup(){
      this.setState({selectedLocation: null});
      this.setState({selectedLandmark: null});
  }



}

export default Map;