import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ButtonPrimary from "../../components/buttons/ButtonPrimary";
import { FormInput } from "../../components/inputs/FormInput";
import LocalStorageAuth from "../../helpers/localStorageAuth";
import { useWorkingIndicator } from "../../hooks/useBooleanToggler";
import { setAxiosConfiguration } from "../../interceptors";
import { LoginForm } from "../../models/user";
import UserService from "../../services/userService";

// !default credencial only for TEST, for production DELETE
const initialValues = {
  userName: "sarah",
  password: "connor",
};

const Login = () => {
  const navigation = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>({
    values: initialValues,
  });

  const { isWorking, startWork, finishWork } = useWorkingIndicator();

  const handlerLogin = async (data: LoginForm) => {
    if (isWorking) return;

    startWork();
    const response = await UserService.login(data);
    finishWork();

    if ("error" in response) {
      toast.error(response.error);
    } else {
      LocalStorageAuth.setAuth(response);
      setAxiosConfiguration(response.token);
      navigation("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-center items-center py-12 px-6 lg:px-8">
      <div className=" w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="sm:mx-auto sm:w-full sm:max-w-md">
            <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
              Welcome
            </h2>
          </div>
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit(handlerLogin)}
          >
            <FormInput<LoginForm>
              label="User name"
              placeholder="Enter your username"
              register={register}
              errors={errors}
              rules={{
                required: "You must enter you username",
              }}
              name="userName"
            />
            <FormInput<LoginForm>
              label="Password"
              placeholder="Enter your password"
              register={register}
              errors={errors}
              rules={{
                required: "You must enter you password",
              }}
              name="password"
              typeInput="password"
            />

            <ButtonPrimary
              label={!isWorking ? "Login" : "Loading..."}
              loading={isWorking}
              type="submit"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
