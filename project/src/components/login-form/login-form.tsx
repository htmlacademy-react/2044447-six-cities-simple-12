import React from 'react';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';
import styles from './login-form.module.css';

type FieldProps = {
  value: string;
  error: boolean;
  errorText: string;
  regexp: RegExp;
};

type dataProps = {
  [key: string]: FieldProps;
};

const LoginForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<dataProps>({
    email: {
      value: '',
      error: false,
      errorText: 'Please enter correct e-mail',
      regexp: /^[^ ]+@[^ ]+\.[a-z]{2,3}$/,
    },
    password: {
      value: '',
      error: false,
      errorText:
        'Please enter correct password, min one letter(eng) and one number',
      regexp: /(?=.*[0-9])(?=.*[A-Za-z])[A-Za-z0-9]{2,}/,
    },
  });

  const handleLoginChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = target;
    const isValidField = data[name].regexp.test(value);

    setData({
      ...data,
      [name]: {
        ...data[name],
        value,
        error: !isValidField,
      },
    });
  };

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    dispatch(
      loginAction({
        login: data.email.value,
        password: data.password.value,
      })
    );
  };

  return (
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>

        <input
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          value={data.email.value}
          onChange={handleLoginChange}
          required
        />
        {data.email.error && (
          <span className={styles.error}>{data.email.errorText}</span>
        )}
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          className="login__input form__input"
          type="password"
          name="password"
          placeholder="Password"
          required
          value={data.password.value}
          onChange={handleLoginChange}
        />
        {data.password.error && (
          <span className={styles.error}>{data.password.errorText}</span>
        )}
      </div>
      <button className="login__submit form__submit button" type="submit">
        Sign in
      </button>
    </form>
  );
};

export default LoginForm;
