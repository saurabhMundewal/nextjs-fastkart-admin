import { useMutation, useQueryClient } from "@tanstack/react-query";
import request from "../AxiosUtils";
import SuccessHandle from "../CustomFunctions/SuccessHandle";
import { useTranslation } from "react-i18next";

const useDelete = (url, refetch, extraFunction) => {
  
  const { t } = useTranslation("common");
  const queryClient = useQueryClient();
  return useMutation(
    (deleteId) => request({ url: `${url}/${deleteId}`, method: "delete" }),
    {
      onSuccess: (resData) => {
        SuccessHandle(resData, false, false, t("DeletedSuccessfully"));
        refetch && queryClient.invalidateQueries({ queryKey: [refetch] });
        extraFunction && extraFunction(resData);
      },
    }
  );
};

export default useDelete;
