import React, {
    ReactElement,
    useEffect,
    useLayoutEffect,
    useState,
} from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useParams } from 'react-router-dom';

/** Types */
import type { Action } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';
import type { rootState } from '../../../redux';

/** Actions */
import {
    getAllChannels,
    getCurrentChannel,
} from '../../../redux/channel/thunk';
import {
    sendMessage,
    receiveMessage,
    joinChannel,
} from '../../../redux/socket/actions';

/** Selectors */
import { userSelector } from '../../../redux/user/selectors';
import { channelsSelector } from '../../../redux/channel/selectors';

/** Component */
import Button from '../../common/Button/Button';
import InputCustom from '../../common/InputCustom/InputCustom';
import MessagesList from '../../common/MessagesList/MessagesList';

import stylesButton from '../../common/Button/Button.module.css';
import Loading from '../../HOC/Loading/Loading';
import { IMessage } from '../../../redux/types';
import { pushMessage } from '../../../redux/channel/actions';

const Channel = ({
    user,
    emitMessage,
    onMessage,
    addMessage,
    getChannel,
    getChannels,
    joinChannelById,
    channels,
}: TConnectedProps): ReactElement => {
    const [message, setMessage] = useState<string>('');
    const { id: channelId } = useParams<{ id?: string }>();

    useEffect(() => {
        if (!channels.length) {
            getChannels();
            getChannel(channelId as string);
            joinChannelById(channelId as string);
        }
    }, [channelId]);

    useLayoutEffect(() => {
        onMessage((data) => {
            addMessage(data);
        });
    }, []);

    return (
        <div>
            <div>
                <MessagesList />
            </div>
            <div>
                <InputCustom
                    type="text"
                    value={message}
                    setValue={setMessage}
                    name="message"
                    label="message"
                />
                <Button
                    submit
                    isDisabled={!message.length}
                    style={stylesButton.ButtonPrimary}
                    click={() =>
                        emitMessage({
                            userId: user.id,
                            channelId,
                            content: message,
                        })
                    }
                    value="send"
                />
            </div>
        </div>
    );
};

const mapStateToProps = (state: rootState) => ({
    user: userSelector(state),
    channels: channelsSelector(state),
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<rootState, void, Action>,
) => ({
    getChannel: (id: string) => dispatch(getCurrentChannel(id)),
    getChannels: () => dispatch(getAllChannels()),
    joinChannelById: (id: string) => dispatch(joinChannel(id)),
    addMessage: (message: IMessage) => dispatch(pushMessage(message)),
    emitMessage: (message: any) => dispatch(sendMessage(message)),
    onMessage: (cb: (message: IMessage) => void) =>
        dispatch(receiveMessage(cb)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type TConnectedProps = ConnectedProps<typeof connector>;

export default connector(
    Loading<TConnectedProps>('channels')(React.memo(Channel)),
);
