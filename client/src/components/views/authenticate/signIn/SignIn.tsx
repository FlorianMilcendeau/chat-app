import React, { ReactElement, useState, useEffect, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import type { Action } from 'redux';
import type { ThunkDispatch } from 'redux-thunk';

/** Types */
import type { rootState } from '../../../../redux';
import type { UserLogin } from '../../../../redux/user/types';

/** Components */
import Button from '../../../common/Button/Button';
import InputCustom from '../../../common/InputCustom/InputCustom';

/** Actions */
import { userLogin } from '../../../../redux/user/thunk';

/** Styles */
import styles from '../Authenticate.module.css';
import stylesButton from '../../../common/Button/Button.module.css';

interface Form {
    email: string;
    password: string;
}

const SignIn = ({ login, loadingUser }: TConnectedProps): ReactElement => {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [form, setForm] = useState<Form>({
        email: '',
        password: '',
    });
    const { email, password } = form;

    const handleSubmit = (e: FormEvent): void => {
        e.preventDefault();
        login(form);
    };

    const formatEmail = new RegExp(
        /^([\w-]+)\.?([\w-]+)@([A-Za-z]+)\.([A-Za-z]{2,})$/,
    );

    useEffect(() => {
        if (formatEmail.test(email) && password) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [email, password]);

    return (
        <div>
            <form
                className={styles.formAuth}
                onSubmit={(e: FormEvent<HTMLFormElement>) => handleSubmit(e)}
            >
                <h2 className={styles.titleForm}>Sign-in</h2>
                <InputCustom
                    type="email"
                    name="email"
                    label="email"
                    value={email}
                    setValue={(value: string, name: string) =>
                        setForm({ ...form, [name]: value })
                    }
                    pattern={formatEmail}
                    messageError="address e-mail incorrect."
                />
                <InputCustom
                    type="password"
                    name="password"
                    label="password"
                    value={password}
                    setValue={(value: string, name: string) =>
                        setForm({ ...form, [name]: value })
                    }
                />
                <Button
                    submit
                    value="Login"
                    click={() => null}
                    isDisabled={isDisabled}
                    style={stylesButton.ButtonPrimary}
                    loading={loadingUser}
                />
                <p className={styles.switchForm}>
                    Don&apos;t have an account yet ?&ensp;
                    <Link to="/authenticate/sign-up">sign-up</Link>
                </p>
            </form>
        </div>
    );
};

const mapStateToProps = ({ user }: rootState) => ({
    loadingUser: user.loading,
});

const mapDispatchToProps = (
    dispatch: ThunkDispatch<rootState, void, Action>,
) => ({
    login: (user: UserLogin): void => dispatch(userLogin(user)),
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type TConnectedProps = ConnectedProps<typeof connector>;

export default connector(SignIn);
