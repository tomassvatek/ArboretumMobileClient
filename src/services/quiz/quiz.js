export default class Quiz {
    constructor(userLocation, trees ) {
        this._userLocation = userLocation;
        this._trees = trees;
        this._currentTreeIndex = 0;
    }

    startQuiz = () => {
        if(this._currentTreeIndex <= trees.length - 1) {
            
        }
    }
}


export const _startQuiz = () => {
    console.log("Current tree");
    console.log(this.state.destination);
    if (this.state.index <= this.props.trees.length - 1) {
        const { location } = this.props.location;
        this.setState({
            destination: this.props.trees[this.state.index]
        }, () => {
            let destinationLatLng = {
                latitude: this.state.destination.latitude,
                longitude: this.state.destination.longitude
            };
            getPolylineCoordinates(this.props.location, destinationLatLng).then(polylineCoordinates =>
                this.setState({
                    polylineCoordinates
                }, () => this._incrementIndex())
            )
        })
    }
}