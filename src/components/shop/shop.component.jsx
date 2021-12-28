import React from 'react';
import { Route } from 'react-router-dom';

import WithSpinner from '../with-spinner/with-spinner.component';

import CollectionOverview from '../collections-overview/collections-overview.component';
import CollectionPage from '../../pages/collection/collection.component';
import { firestore, convertCollectionSnapshotToMap } from '../../firebase/firebase.utils';
import { connect } from 'react-redux';
import { updateCollections } from '../../redux/shop/shop.actions';


const CollectionsOverviewWithSpinner = WithSpinner(CollectionOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);
class ShopPage extends React.Component {

    state = {
        loading: true
    }

    unsubscribeFromSnapshop = null;

    componentDidMount() {
        const collectionRef = firestore.collection('collections');
        this.unsubscribeFromSnapshop = collectionRef.onSnapshot(async snapshop => {
            const collectionMap = convertCollectionSnapshotToMap(snapshop);
            updateCollections(collectionMap);
            this.setState({ loading: false })
        });
    }

    render() {
        const { match } = this.props;
        const { loading } = this.state;
        return ( 
        <div className='shop-page'>
            <Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>} />
            <Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props}/>} />
        </div>)
    }
}

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => 
    dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);