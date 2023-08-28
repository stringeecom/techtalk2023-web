<template>
  <div>
    <section class="content">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                <h3 class="card-title">Posts</h3>
                <button @click.prevent="onBtnAddNewClick" class="btn btn-success float-right">
                  <i class="fa fa-plus"></i> Add new
                </button>
              </div>

              <div class="card-body">
                <div class="table-responsive no-padding">
                  <table class="table table-bordered tbl-custom">
                    <thead>
                      <tr>
                        <th>No.</th>
                        <th>Title</th>
                        <th>Thumb</th>
                        <th>CreateBy</th>
                        <th>CreateAt</th>
                        <th>UpdateAt</th>
                        <th class="text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(post, index) in posts" :key="post.id">
                        <td>{{ index + 1 }}</td>
                        <td>{{ post.title }}</td>
                        <td><a :href="post.thumb" target="_blank">Click để xem</a></td>
                        <td>{{ post.create_by }}</td>
                        <td>{{ formatDateTime(post.create_at) }}</td>
                        <td>{{ formatDateTime(post.update_at) }}</td>
                        <td>
                          <button class="btn btn-success" @click.prevent="onBtnEditClick(post)">Edit
                          </button>
                          <button style="margin-left: 10px" class="btn btn-danger"
                            @click.prevent="onBtnDeleteClick(post)">Delete
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                </div>
                <div v-if="paging.total > 0" class="row">
                  <div class="col-sm-6">
                    <paginate style="margin-top: 15px" v-model="paging.selected_page" :page-count="paging.total"
                      :page-range="paging.range" :initial-page="paging.selected_page" :click-handler="onPagingClick"
                      :prev-text="'Previous'" :next-text="'Next'" :container-class="'pagination'"
                      :page-class="'page-item'">
                    </paginate>
                  </div>
                  <div class="col-sm-6">
                    <span style="margin-top: 15px" class="float-right">Total: {{
                      formatNumber(paging.record)
                    }} record(s)</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import api from "@src/utils/api";
import array_utils from "@src/utils/array_utils";
import time_utils from "@src/utils/time_utils";
import Paginate from "vuejs-paginate-next";
import number_utils from "@src/utils/number_utils";
import m_utils from "@src/utils/m_utils";
import dialog from "@src/utils/dialog";
import helper from "@src/utils/helper";

export default {

  components: {
    "paginate": Paginate
  },

  data() {
    return {
      p_name: "",
      posts: [],
      paging: {
        record: 0,
        total: 0,
        size: 50,
        range: 3,
        selected_page: 1
      }
    };
  },
  mounted() {
    this.loadData();
  },
  methods: {
    onBtnEditClick(post) {
      console.log(post);
      this.$router.push("/update-post?id=" + post.id);
    },
    onBtnDeleteClick(b) {
      dialog.confirmDialog("Bạn muốn xóa post này chứ ?", "Xóa", () => {
        let params = { id: b.id };
        api.post(this, "/post/delete", params, (data) => {
          console.log("data: " + JSON.stringify(data.data));
          let rc = parseInt(data.data.rc);
          if (rc === 0) {
            let msg = "Xóa post thành công";
            helper.notifySuccess(msg);
            this.loadData();
          } else {
            dialog.showDialog("Thông báo", "Xóa post không thành công");
            helper.notifyError(data.data.rd);
          }
        }, null, true);
      });
    },
    onBtnAddNewClick() {
      // window.location.href = "/create-post";
      this.$router.push("/create-post");
    },
    onPagingClick(pageNum) {
      this.paging.selected_page = pageNum;
      this.loadData();
    },
    loadData() {
      let params = {
        "name": this.p_name,
        "page": this.paging.selected_page,
        "size": this.paging.size
      };
      api.get(this, "/post/find-all-2", params, (data) => {
        console.log("data: ", data);
        array_utils.clearArrays(this.posts);
        this.paging.total = m_utils.calcTotalPage(this.paging.size, data.data.total);
        this.paging.record = data.data.total;
        if (array_utils.isArray(data.data.rows)) {
          this.posts = data.data.rows;
        }
      }, null, true);
    },
    formatDateTime(date) {
      return time_utils.convertTime(date);
    },
    formatNumber(num) {
      return number_utils.formatNumberEx(num);
    }
  }
};
</script>
<style></style>
