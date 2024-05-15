<template>
  <div class="flex flex-col p-1 space-y-1">
    <n-input v-model:value="mailForm.company" placeholder="Company's name" />
    <n-input
      v-model:value="mailForm.companyUrl"
      placeholder="Company's homepage / Recruiting url"
    />
    <n-input
      v-model:value="mailForm.content"
      type="textarea"
      :rows="7"
      placeholder="Mail's content"
    />
    <div class="text-right">
      <n-button @click="handleSendMail">Send</n-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from "vue";
  import { useNotification, NotificationType } from "naive-ui";
  import { sendMail } from "/@/api/sendMail";
  const mailForm = ref<{
    company: string;
    companyUrl: string;
    content: string;
  }>({
    company: "",
    companyUrl: "",
    content: "Let keep in touch !!",
  });
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
    }
  }
</script>
