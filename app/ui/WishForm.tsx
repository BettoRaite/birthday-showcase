"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import type { WishFormItem } from "../lib/definitions";
import { WishFormSchema } from "../lib/schemas";
import { createWish } from "../actions/db/actions";
import { clsx } from "clsx";

const initialValues: WishFormItem = {
  authorName: "",
  role: "",
  group: "",
  content: "",
};

export function WishForm() {
  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        const result = WishFormSchema.safeParse(values);

        if (result.success) {
          return {};
        }
        const errors: Record<string, string> = {};
        const errorFields = result.error.flatten().fieldErrors;
        type ErrorFieldName = keyof typeof errorFields;
        for (const errorFieldName of Object.keys(errorFields)) {
          const firstErrorMessage =
            errorFields[errorFieldName as ErrorFieldName]?.[0];
          if (errorFieldName === "group" && values.role !== "студент") {
            continue;
          }
          if (firstErrorMessage) {
            errors[errorFieldName] = firstErrorMessage;
          }
        }
        return errors;
      }}
      validateOnChange={true}
      onSubmit={async (values) => {
        // Doing some sanitization.
        if (values.role !== "студент") {
          values.group = "";
        }
        await createWish(values);
      }}
    >
      {({ isSubmitting, values, errors, touched }) => (
        <Form
          className={clsx(
            "overflow-y-hidden  flex flex-col justify-center gap-4 p-4 bg-lavender-pink w-11/12 m-auto rounded-lg transition-all duration-200 font-bold bg-blue-100 shadow-lg max-w-96",
            {
              "opacity-50": isSubmitting,
            }
          )}
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="authorName">Имя</label>
            <Field
              className={clsx(
                "border-1 rounded-lg p-2 outline-none focus:border-slate-400 transition-all duration-200",
                {
                  " border-red-400": errors.authorName,
                }
              )}
              name="authorName"
              id="authorName"
              placeholder=""
            />
          </div>
          {touched.authorName && (
            <ErrorMessage name="authorName" component="div" />
          )}

          <fieldset>
            <legend>Роль</legend>
            <div className="flex gap-2">
              <Field type="radio" name="role" id="role_1" value="" />
              <label className="capitalize" htmlFor="role_1">
                секрет
              </label>
            </div>
            <div className="flex gap-2">
              <Field type="radio" name="role" id="role_2" value="студент" />
              <label className="capitalize" htmlFor="role_2">
                студент
              </label>
            </div>
            <div className="flex gap-2">
              <Field type="radio" name="role" id="role_3" value="учитель" />
              <label className="capitalize" htmlFor="role_3">
                учитель
              </label>
            </div>
          </fieldset>

          <div
            className={clsx("flex flex-col gap-2", {
              "h-0 opacity-0": values.role !== "студент",
            })}
          >
            <label htmlFor="group">Группа *</label>
            <Field
              className={clsx(
                "border-1 rounded-lg p-2 outline-none focus:border-slate-400 transition-all duration-200 text-slate-600",
                {
                  " border-red-400": errors.group,
                }
              )}
              disabled={values.role !== "студент"}
              name="group"
              id="group"
              placeholder="Пример: хх-хх"
              maxLength={5}
            />
            {values.role === "студент" && touched.role && (
              <ErrorMessage
                className="text-xs text-red-400"
                name="group"
                component="div"
              />
            )}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="content">Ваше пожелание</label>
            <Field
              className={clsx(
                "border-1 rounded-lg p-2 outline-none focus:border-slate-400 transition-all duration-200 resize-none min-h-60 text-slate-600",
                {
                  " border-red-400": errors.content && touched.content,
                }
              )}
              as="textarea"
              name="content"
              id="content"
              rows="4"
              cols="50"
            />{" "}
            {touched.content && (
              <ErrorMessage
                className="text-xs text-red-400"
                name="content"
                component="div"
              />
            )}
          </div>
          <button
            className="font-bold rounded-lg py-4 mt-4 border-1 bg-white hover:bg-sky-blue hover:text-white transition-all duration-200"
            type="submit"
            disabled={isSubmitting}
          >
            Отправить
          </button>
        </Form>
      )}
    </Formik>
  );
}
