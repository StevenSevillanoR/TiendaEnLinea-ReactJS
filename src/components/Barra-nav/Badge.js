import React, {Component} from 'react';
import './Barra-nav.css';

//let boleano = true;

class Badge extends Component{
    constructor(props){
        super(props)

        console.log(this.props.Total);
        console.log(this.props.Boleano);
        
        this.state = {
            total: this.props.Total,
            boleano: this.props.Boleano,
        }



        console.log(this.state.total, this.state.boleano);

    }

    componentWillMount(){
        this.setState({total: sessionStorage.getItem('Total'), boleano: this.props.Boleano});
        console.log(this.state.total);
    }

    render(){
        console.log(sessionStorage.getItem('Total'));
        //document.getElementById('badgeNotification').innerHTML = sessionStorage.getItem('Total');
        return(
            <span id="badgeNotification" hidden={this.state.boleano} className="badge badge-danger badge-pill">{sessionStorage.getItem('Total')}</span>
        )
    }

}

export let updateBadge = () => {
  //console.log(this.state.boleano);
  document.getElementById('badgeNotification').hidden = false;
  console.log(document.getElementById('badgeNotification').innerHTML = (sessionStorage.getItem('Total')));
    
}

export default Badge;