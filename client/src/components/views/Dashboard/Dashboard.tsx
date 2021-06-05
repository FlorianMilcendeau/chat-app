import React, { ReactElement, useState } from 'react';
import { connect } from 'react-redux';
import type { Action } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

/** Types */
import type { IMessage } from '../../../redux/types';
import type { rootState } from '../../../redux';

import InputCustom from '../../common/InputCustom/InputCustom';

/** Actions */
import { sendMessage, receiveMessage } from '../../../redux/socket/actions';

const Dashboard = (): ReactElement => {
    const [message, setMessage] = useState<string>('');
    return (
        <div>
            <InputCustom
                type="text"
                value={message}
                setValue={setMessage}
                name="message"
                label="message"
            />
        </div>
    );
};

const mapDispatchToProps = (
    dispatch: ThunkDispatch<rootState, void, Action>,
) => ({
    sendMessage: (message: IMessage) => dispatch(sendMessage(message)),
    onLiveStream: (data: (message: IMessage) => void) =>
        dispatch(receiveMessage(data)),
});

const connector = connect(null, mapDispatchToProps);

export default connector(Dashboard);
