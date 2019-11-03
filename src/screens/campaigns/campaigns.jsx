import React, { Component } from "react";
import "./campaigns.scss";
import MenuBar from "../../components/menuBar/menuBar";
import AppModal from "../../components/appModal/appModal";
import { connect } from "react-redux";
import { getCampaigns } from "../../store/actions/campaignAction";
import CampaignTable from "./component/campaignTable/campaignTable";
import PropTypes from "prop-types";

class Campaigns extends Component {
  state = {
    menuDataArray: [
      { name: "Upcoming Campaigns", selected: true },
      { name: "Live Campaigns", selected: false },
      { name: "Past Campaigns", selected: false }
    ],
    totalCampaigns: [],
    campaignsToShow: []
  };

  constructor(props) {
    super(props);
    this.props.getCampaigns();
    this.modalRef = React.createRef();
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    this.setState({ ...this.state, totalCampaigns: nextProps.campaigns }, () =>
      this.showSelectedMenuData()
    );
  }

  onMenuChange = selectedName => {
    this.state.menuDataArray.map(m => {
      if (m.name === selectedName) {
        m.selected = true;
      } else {
        m.selected = false;
      }
      return m;
    });
    this.setState(
      { ...this.state, menuDataArray: this.state.menuDataArray },
      () => this.showSelectedMenuData()
    );
  };

  showSelectedMenuData = () => {
    let selectedMenu = this.getSelectedMenuName();
    let todaysDate = new Date();
    let currentTime = todaysDate.getTime();
    let campaignsToShow;
    switch (selectedMenu[0].name) {
      case "Upcoming Campaigns":
        campaignsToShow = this.state.totalCampaigns.data.filter(campaigns => {
          if (currentTime < campaigns.createdOn) {
            return campaigns;
          }
        });
        break;
      case "Live Campaigns":
        campaignsToShow = this.state.totalCampaigns.data.filter(campaigns => {
          let dateToday = this.getDateformatted(currentTime);
          let campaignDate = this.getDateformatted(campaigns.createdOn);
          if (dateToday === campaignDate) {
            return campaigns;
          }
        });
        break;
      case "Past Campaigns":
        campaignsToShow = this.state.totalCampaigns.data.filter(campaigns => {
          if (currentTime > campaigns.createdOn) {
            return campaigns;
          }
        });
        break;
      default:
        campaignsToShow = [];
        break;
    }
    this.setState({
      ...this.state,
      campaignsToShow
    });
  };

  getDateformatted = date => {
    const dateTobeFormatted = new Date(date);
    const year = dateTobeFormatted.getFullYear();
    const month = dateTobeFormatted.getMonth() + 1;
    const day = dateTobeFormatted.getDate();
    return `${year}-${month}-${day}`;
  };

  getSelectedMenuName = () => {
    return this.state.menuDataArray.filter(selectedMenu => {
      if (selectedMenu.selected) {
        return selectedMenu;
      }
    });
  };

  render() {
    return (
      <React.Fragment>
        <div className="screen-container campaigns">
          <main>
            <h1>Manage Campaigns</h1>
            <MenuBar
              menuData={this.state.menuDataArray}
              handleMenuChange={this.onMenuChange}
            />
            <CampaignTable
              tableHeader={["DATE", "CAMPAIGN", "VIEW", "ACTIONS"]}
              tableData={this.state.campaignsToShow}
              showPricing={details => this.modalRef.current.handleShow(details)}
              selectedCampaignType={this.getSelectedMenuName()}
            />
          </main>
        </div>
        <AppModal ref={this.modalRef} />
      </React.Fragment>
    );
  }
}

Campaigns.propTypes = {
  campaigns: PropTypes.object.isRequired,
  getCampaigns: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  campaigns: state.campaigns
});

const mapDispatchToProps = dispatch => ({
  getCampaigns: () => dispatch(getCampaigns())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Campaigns);
