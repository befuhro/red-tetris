import { connect } from 'react-redux';

import GameWatcher from '../../../components/Room/GameWatcher'

const mapStateToProps = (state) => ({
    players: state.room.players
});

const mapDispatchToProps = dispatch => ({ dispatch: dispatch });

export default connect(mapStateToProps, mapDispatchToProps)(GameWatcher);
