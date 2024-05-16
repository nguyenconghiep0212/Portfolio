<template>
  <div class="flex flex-col p-2 space-y-1 sm:w-96">
    <n-form ref="formRef" :model="mailForm" :rules="rules" size="small">
      <n-form-item path="company" label="From:">
        <n-input v-model:value="mailForm.company" placeholder="From" />
      </n-form-item>
      <n-form-item path="companyUrl" label="Referral link:">
        <n-input
          v-model:value="mailForm.companyUrl"
          placeholder="Referral link"
        />
      </n-form-item>
      <n-form-item path="content" label="Content:">
        <n-input
          v-model:value="mailForm.content"
          type="textarea"
          :rows="7"
          placeholder="Mail's content"
        />
      </n-form-item>
    </n-form>

    <div class="flex items-center justify-between">
      <div class="flex items-center space-x-1">
        <n-button strong secondary type="primary" size="small">
          <a
            href="mailto:nguyenconghiep0212@gmail.com?subject=Greeting&body=Let keep in touch !!"
          >
            <img
              class="w-5"
              src="https://res.cloudinary.com/dc7jd2eeu/image/upload/v1715451670/Contacts/egxecjvy5cwwu28fkanz.png"
            />
          </a>
        </n-button>

        <span class="text-xs italic opacity-40">
          open official gmail composer
        </span>
      </div>

      <n-button
        class="ml-4"
        :loading="loading"
        size="small"
        type="info"
        strong
        secondary
        @click="handleValidateButtonClick"
      >
        Send
      </n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import {
    useNotification,
    NotificationType,
    FormRules,
    FormValidationError,
  } from "naive-ui";
  import { sendMail } from "/@/api/sendMail";
  const mailForm = ref<{
    company: string;
    companyUrl: string;
    content: string;
  }>({
    company: "",
    companyUrl: "",
    content: "",
  });
  const formRef = ref(null);
  const rules: FormRules = {
    company: {
      required: true,
      message: "Please enter your name",
      trigger: ["input"],
    },
    companyUrl: {
      required: true,
      message: "Please enter referral link (recruitment link)",
      trigger: ["input"],
    },
    content: {
      required: true,
      message: "Please enter mail content",
      trigger: ["input"],
    },
  };
  const loading = ref(false);
  const notification = useNotification();
  function notify(type: NotificationType, content: string, meta = "") {
    notification[type]({
      content,
      meta,
      duration: 10000,
      keepAliveOnHover: true,
    });
  }

  async function handleSendMail() {
    try {
      loading.value = true;
      const res = await sendMail(mailForm.value);
      console.log(res, "res");
      if (res) {
        notify("success", "Thank you for contacting");
      }
    } catch (error) {
      notify(
        "error",
        "Oops, there seem to be a problem has occurred",
        "Please contact me in others platforms"
      );
    } finally {
      loading.value = false;
    }
  }

  function handleValidateButtonClick(e: MouseEvent) {
    e.preventDefault();
    formRef.value?.validate(
      (errors: Array<FormValidationError> | undefined) => {
        if (!errors) {
          handleSendMail();
        } else {
          console.log(errors);
        }
      }
    );
  }
</script>
<style>
  .n-form-item-feedback-wrapper {
    min-height: 10px !important;
  }
</style>
