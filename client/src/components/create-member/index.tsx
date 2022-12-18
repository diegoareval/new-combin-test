import { useForm } from "react-hook-form";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { FormInput } from "../inputs/FormInput";
import { cleanSpaces, regexSsn } from "../../helpers";
import { useWorkingIndicator } from "../../hooks/useBooleanToggler";
import { Member } from "../../models/member";
import memberService from "../../services/memberService";
import { PatternFormat } from "react-number-format";
import { FormErrorMessage } from "../inputs/FormError";
import { useState } from "react";
import { toast } from "react-toastify";

const initialValues: Member = {
  address: "",
  firstName: "",
  lastName: "",
  ssn: "",
};

type CreateMemberProps = {
  onCreateMember: (member: Member) => void;
  members: Member[];
};

const CreateMember = ({ onCreateMember, members }: CreateMemberProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<Member>({
    values: initialValues,
  });

  const [showValidateFormat, setShowValidateFormat] = useState(false);

  const { isWorking, startWork, finishWork } = useWorkingIndicator();

  const isUnitSsn = (ssn: string) => {
    return members.find((member) => member.ssn === ssn);
  };

  const handlerSave = async (data: Member) => {
    if (isWorking) return;

    if (!isValidFormat()) {
      return;
    }

    if (isUnitSsn(data.ssn)) {
      toast.error("The SSN already exists in the BD!");
      return;
    }

    startWork();
    const response = await memberService.saveMember({
      address: cleanSpaces(data.address),
      firstName: cleanSpaces(data.firstName),
      lastName: cleanSpaces(data.lastName),
      ssn: data.ssn,
    });
    finishWork();

    if ("error" in response) {
      toast.error(response.error);
    } else {
      toast.success("Member created with success!");
      onCreateMember(response);
    }
  };

  const resetForm = () => {
    reset(initialValues);
  };

  const hasErrors = () => {
    return Boolean(Object.keys(errors)?.length > 0);
  };

  const isValidFormat = () => {
    return regexSsn.test(watch("ssn"));
  };

  return (
    <div className="w-full">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="my-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          New member
        </h2>
      </div>
      <form
        className="space-y-6"
        action="#"
        method="POST"
        onSubmit={handleSubmit(handlerSave)}
      >
        <FormInput<Member>
          label="First Name"
          placeholder="Enter your fist name"
          register={register}
          errors={errors}
          rules={{
            required: "You must enter you first fame",
          }}
          name="firstName"
        />

        <FormInput<Member>
          label="Last Name"
          placeholder="Enter your last name"
          register={register}
          errors={errors}
          rules={{
            required: "You must enter you last fame",
          }}
          name="lastName"
        />

        <FormInput<Member>
          label="Address"
          placeholder="Enter your address"
          register={register}
          errors={errors}
          rules={{
            required: "You must enter you address",
          }}
          name="address"
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            SSN
          </label>
          <PatternFormat
            {...register("ssn")}
            onChange={({ target }) => setValue("ssn", target.value)}
            placeholder="###-##-####"
            format="###-##-####"
            className="p-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-blue-800 rounded-lg"
          />

          {showValidateFormat && !isValidFormat() && (
            <FormErrorMessage className="mt-1">
              <span className="text-red-500">The format is invalid</span>
            </FormErrorMessage>
          )}
        </div>

        <div className="flex gap-7 justify-center">
          <ButtonPrimary
            className="bg-gray-600 hover:bg-gray-500 w-44"
            label="Reset"
            onClick={resetForm}
          />
          <ButtonPrimary
            label={!isWorking ? "Save" : "Saving..."}
            loading={isWorking}
            type="submit"
            className="w-44"
            {...(hasErrors() && {
              disabled: true,
            })}
            onClick={() => setShowValidateFormat(true)}
          />
        </div>
      </form>
    </div>
  );
};

export default CreateMember;
