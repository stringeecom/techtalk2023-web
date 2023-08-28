<template>
  <section class="content">
    <div class="container-fluid">
      <div class="card card-default">
        <div class="card-header">
          <h3 class="card-title"><strong>Create Post</strong></h3>
        </div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-6">
              <div class="form-group cat_page_div">
                <label>Ngôn ngữ <span class="required_t icon_t">*</span></label>
                <select ref="language" class="form-control square" v-model="input.language">
                  <option value="">Chọn ngôn ngữ</option>
                  <option value="en">English</option>
                  <option value="vi">Tiếng Việt</option>
                </select>
                <em class="required_t">{{ errors.language }}</em>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="form-group cat_page_div">
                <label>Tiêu đề <span class="required_t icon_t">*</span></label>
                <input ref="title" type="text" class="form-control square" v-model="input.title" placeholder="Tiêu đề">
                <em class="required_t">{{ errors.title }}</em>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="form-group cat_page_div">
                <label>Mô tả ngắn <span class="required_t icon_t">*</span></label>
                <textarea placeholder="Mô tả ngắn" type="text" ref="sub_title" class="form-control" rows="3"
                  v-model="input.sub_title"></textarea>
                <em class="required_t">{{ errors.sub_title }}</em>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="form-group cat_page_div">
                <label>Danh mục <span class="required_t icon_t">*</span></label>
                <select ref="category" class="form-control square" v-model="input.category">
                  <option value="">Chọn danh mục</option>
                  <option v-for="s in categories" :key="s.id" :value="s.id">{{ s.name }}</option>
                </select>
                <em class="required_t">{{ errors.category }}</em>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-6">
              <div class="form-group cat_page_div">
                <label for="eventRegInput1">Thumbnail <span class="required_t icon_t">*</span></label>
                <select @change="onSelectThumbChange()" v-model="thumb_type" class="form-control square">
                  <option value="">Select</option>
                  <option value="1">Paste Link</option>
                  <option value="2">Upload</option>
                  <option value="3">Chọn file đã upload</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="form-group cat_page_div">
                <label>Link thumb <span class="required_t icon_t">*</span></label>
                <input :disabled="disable_thumb_input" @change="onLinkThumbChange()" v-model="input.thumb" type="text"
                  ref="thumb" placeholder="Thumb Link" class="form-control" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-6">
              <div class="form-group cat_page_div">
                <img ref="preview" @error="onPreviewError" @load="onPreviewLoaded" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="form-group cat_page_div">
                <label>Meta Keywords (cách nhau bằng dấu (,)) <span class="required_t icon_t">*</span></label>
                <textarea ref="metaKeywords" rows="3" class="form-control square" v-model="input.metaKeywords"></textarea>
                <em class="required_t">{{ errors.metaKeywords }}</em>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="form-group cat_page_div">
                <label>Description <span class="required_t icon_t">*</span></label>
                <textarea ref="description" rows="3" class="form-control square" v-model="input.description"></textarea>
                <em class="required_t">{{ errors.description }}</em>
              </div>
            </div>
          </div>
          <div class="row">

            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="form-group cat_page_div">
                <label>Nội dung </label>
                <textarea :id="idMCE" rows="10" class="form-control square" placeholder="Nội dung"></textarea>
              </div>
            </div>

            <div class="col-md-12 col-sm-12 col-xs-12">
              <div class="form-group cat_page_div">
                <button @click.prevent="onCreateClicked()" class="btn btn-success">Create New</button>
              </div>
            </div>

          </div>
        </div>
      </div>
<!--      <UploadImage :open="show_upload_image" :onCancel="onUploadCancelled" :callbackFn="onUploaded" />-->
<!--      <SelectImage :open="show_select_image" :tinyWin="tinyWin" :type_select_image="type_select_image"-->
<!--        :onCancel="onSelectImageCancelled" :callbackFn="onUploaded" :styleBackdrop="{ 'z-index': 75536 }" />-->
    </div>
  </section>
</template>

<script>

// import UploadImage from "@src/views/Images/UploadImage.vue";
// import SelectImage from "@src/views/Images/SelectImage.vue";
import m_utils from "@src/utils/m_utils";
import helper from "@src/utils/helper";
import api from "@src/utils/api";
import array_utils from "@src/utils/array_utils";
import dialog from "@src/utils/dialog";

export default {

  mounted() {
    this.plugin_editor(`#${this.idMCE}`, { append_plugins: "image  media code", height: 500 });
    this.loadCategories();
  },

  components: {
    // UploadImage,
    // SelectImage
  },

  data() {
    return {
      show_select_image: false,
      type_select_image: 0,
      tinyWin: {},

      show_upload_image: false,
      thumb_type: "",
      disable_thumb_input: false,

      categories: [],

      idMCE: m_utils.randomString(),

      errors: {
        "title": "",
        "sub_title": "",
        "category": "",
        "metaKeywords": "",
        "description": "",
        "thumb": "",
        "content": "",
        "language": ""
      },

      input: {
        "title": "",
        "sub_title": "",
        "category": "",
        "metaKeywords": "",
        "description": "",
        "thumb": "",
        "content": "",
        "language": ""
      },

      thumb_check: false
    };
  },

  methods: {

    onUploadCancelled() {
      this.show_upload_image = false;
      this.thumb_type = "";
    },

    onSelectImageCancelled() {
      this.show_select_image = false;
      this.thumb_type = "";
    },

    onUploaded(url) {
      this.input.thumb = url;
      this.onLinkThumbChange();
      this.disable_thumb_input = true;
    },

    loadCategories() {
      let params = {};
      api.get(this, "/news-category", params, (data) => {
        array_utils.clearArrays(this.categories);
        if (array_utils.isArray(data.data.rows)) {
          this.categories = data.data.rows;
        }
      }, null, false);
    },

    onLinkThumbChange() {
      console.log(this.input.thumb);
      if (!m_utils.checkString(this.input.thumb)) {
        return;
      }
      if (m_utils.isValidUrl(this.input.thumb)) {
        console.log("thumb ok");
        m_utils.showLoading(true);
        this.$refs.preview.src = this.input.thumb;
      } else {
        helper.notifyError("Link thumb không đúng định dạng");
        this.thumb_check = false;
      }
    },

    onSelectThumbChange() {
      console.log("onSelectThumbChange: " + this.thumb_type);
      this.disable_thumb_input = false;
      if (parseInt(this.thumb_type) === 2) {
        this.show_upload_image = true;
      } else if (parseInt(this.thumb_type) === 3) {
        this.type_select_image = 0;
        this.show_select_image = true;
      } else if (parseInt(this.thumb_type) === 1) {
        this.input.thumb = "";
      }
    },

    onPreviewLoaded() {
      m_utils.hideAllModal();
      helper.notifySuccess("Load ảnh thumb thành công");
      this.thumb_check = true;
    },

    onPreviewError() {
      m_utils.hideAllModal();
      helper.notifyError("Load ảnh thumb lỗi");
      this.thumb_check = false;
    },

    resetErrors() {
      this.errors = {
        "title": "",
        "sub_title": "",
        "category": "",
        "metaKeywords": "",
        "description": "",
        "thumb": "",
        "content": ""
      };
    },

    onCreateClicked() {
      this.resetErrors();

      if (!m_utils.checkString(this.input.language)) {
        this.errors.language = "Please select language";
        this.$refs.language.focus();
        return;
      }

      if (!m_utils.checkString(this.input.title)) {
        this.errors.title = "Please enter title";
        this.$refs.title.focus();
        return;
      }

      if (!m_utils.checkString(this.input.sub_title)) {
        this.errors.sub_title = "Please enter sub_title";
        this.$refs.sub_title.focus();
        return;
      }

      if (!m_utils.checkString(this.input.category)) {
        this.errors.category = "Please select category";
        this.$refs.category.focus();
        return;
      }

      if (!m_utils.checkString(this.input.thumb)) {
        this.errors.thumb = "Please select thumb";
        this.$refs.thumb.focus();
        return;
      }

      if (!this.thumb_check) {
        helper.notifyError("Vui lòng chọn thumb");
        this.errors.thumb = "Please select thumb";
        return;
      }

      if (!m_utils.checkString(this.input.metaKeywords)) {
        this.errors.metaKeywords = "Please enter metaKeywords";
        this.$refs.metaKeywords.focus();
        return;
      }

      if (!m_utils.checkString(this.input.description)) {
        this.errors.description = "Please enter urlSlug";
        this.$refs.description.focus();
        return;
      }

      let content = window.tinymce.get(this.idMCE).getContent();
      if (!m_utils.checkString(content)) {
        helper.notifyError("Vui lòng nhập content");
        return;
      }

      let categories = [];
      categories.push(this.input.category);

      const params = {
        title: this.input.title,
        sub_title: this.input.sub_title,
        thumb: this.input.thumb,
        content: content,
        categories: categories,
        tags: [],
        keywords: this.input.metaKeywords,
        language: this.input.language,
        description: this.input.description
      };

      dialog.confirmDialog("Do you want create this post", "Create", () => {
        api.post(this, "/post/create", params, (data) => {
          console.log("data: " + JSON.stringify(data.data));
          let rc = parseInt(data.data.rc);
          let mResp = m_utils.getMessageResponse2(data, "Create post success !", "Create post failed !");
          if (rc === 0) {
            helper.notifySuccess(mResp.notify);
            window.location.href = "/posts";
          } else {
            dialog.showDialog("Warning", mResp.dialog);
            helper.notifyError(mResp.notify);
          }
        }, null, true);
      });

    },

    plugin_editor(selector, settings) {
      selector = typeof (selector) == "undefined" ? ".tinymce" : selector;
      const _settings = {
        selector: selector,
        theme: "modern",
        branding: false,
        paste_data_images: true,
        relative_urls: false,
        convert_urls: false,
        inline_styles: true,
        verify_html: false,
        cleanup: false,
        autoresize_bottom_margin: 25,
        plugins: [
          "advlist autolink lists link charmap print preview hr anchor pagebreak",
          "searchreplace wordcount visualblocks visualchars code fullscreen",
          "insertdatetime nonbreaking save table contextmenu directionality",
          "emoticons template paste textcolor colorpicker textpattern codesample"
        ],
        toolbar1: " undo redo formatselect | fontselect fontsizeselect | forecolor backcolor | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist | link image media | print preview emoticons | code codesample pagebreak",
        style_formats: [
          { title: "Heading 2", format: "h2" },
          { title: "Heading 3", format: "h3" },
          { title: "Heading 4", format: "h4" },
          { title: "Heading 5", format: "h5" },
          { title: "Heading 6", format: "h6" },
          { title: "Normal", block: "div" }
        ],
        file_browser_callback: this.elFinderBrowser,
        setup: (editor) => {
          editor.on("paste", (e) => {
            const items = e.clipboardData.items;
            for (let i = 0; i < items.length; i++) {
              const item = items[i];
              if (item.type.indexOf("image") !== -1) {
                e.preventDefault();
                const file = item.getAsFile();
                const fd = new FormData();
                fd.append("image", file);
                api.postForm(this, "/post/upload", fd, (data) => {
                  console.log("data: " + JSON.stringify(data.data));
                  let rc = parseInt(data.data.rc);
                  let mResp = m_utils.getMessageResponse2(data,
                    "Upload file success !",
                    "Upload file failure !");
                  if (rc === 0) {
                    helper.notifySuccess(mResp.notify);
                    const content = "<img src=\"" + data.data.url + "\" alt=\"Image\">";
                    editor.insertContent(content);
                    navigator.clipboard.writeText("")
                      .then(function () {
                        console.log("Clipboard cleared");
                      })
                      .catch(function (err) {
                        console.error("Failed to clear clipboard", err);
                      });
                  } else {
                    helper.notifyError(mResp.notify);
                  }
                }, null, true);
              } else {
                console.log(item.type);
              }
            }
          });
        }
      };

      if (typeof (settings) != "undefined") {
        for (let key in settings) {
          if (key != "append_plugins") {
            _settings[key] = settings[key];
          } else {
            _settings["plugins"].push(settings[key]);
          }
        }
      }
      return window.tinymce.init(_settings);
    },

    elFinderBrowser(field_name, url, type, win) {
      this.tinyWin = { win, field_name };
      this.type_select_image = 1;
      this.show_select_image = true;
      return false;
    }

  }
};
</script>

<style scoped>
.required_t {
  color: red;
}

label {
  position: relative;
}

.icon_t {
  position: absolute;
  top: 0;
  right: -10px;
}
</style>
