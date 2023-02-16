<template>
    <div class="admin-users-component">
        <p class="title-admin-component">Utilizatori <span class="small-element-title">({{usersNumber}})</span></p>
        <!-- <div class="users-table">
            <b-overlay :show="isLoading" rounded="sm" spinner-variant="danger" spinner-type="grow">
            <b-row class="row-header-table">
              <b-col class="col-users-table">Index</b-col>
              <b-col class="col-users-table">Prenume</b-col>
              <b-col class="col-users-table">Nume</b-col>
              <b-col class="col-users-table">Email</b-col>
              <b-col class="col-users-table">Role</b-col>
            </b-row>
            <b-row class="row-content-table">
              <b-row class="row-users-table" v-for="(user, index) in users" :key="user.idUser">
                <b-col class="col-users-table">{{index + 1}}</b-col>
                <b-col class="col-users-table">{{user.firstName}}</b-col>
                <b-col class="col-users-table">{{user.lastName}}</b-col>
                <b-col class="col-users-table">{{user.email}}</b-col>
                <b-col class="col-users-table">{{user.role}}</b-col>
              </b-row>
            </b-row>
            </b-overlay>
        </div> -->
        <b-table bordered striped :fields="fieldsTable" :items="users" :busy="isLoading" responsive="sm" class="users-table">
            <template #table-busy>
              <div class="text-center text-danger my-2">
                <b-spinner class="align-middle"></b-spinner>
                <strong>Loading...</strong>
              </div>
            </template>
            <template #head(index)>Index</template>
            <template #head(firstName)>Prenume</template>
            <template #head(lastName)>Nume</template>
            <template #head(email)>Email</template>
            <template #head(role)>Rol</template>
            <template #cell(index)="data">
              {{ data.index + iteration + 1 }}
            </template>
            <template #cell(firstName)="data">
              {{data.item.firstName}}
            </template>
            <template #cell(lastName)="data">
              {{data.item.lastName}}
            </template>
            <template #cell(email)="data">
              {{ data.item.email }}
            </template>
            <template #cell(role)="data">
              <i>{{ data.item.role }}</i>
            </template>
        </b-table>
        <b-row class="row-container-properties">
          <b-pagination
            v-model="currentPage"
            :total-rows="usersNumber"
            :per-page="perPageUsers"
            @input="getUsers()"
            class="pagination-table"
          ></b-pagination>
        </b-row>
    </div>
</template>
<script>
import axios from 'axios';
// import $ from "jquery";
 export default {
    components: {
    },
    data() {
        return {
            isLoading: true,
            usersNumber: "",
            users: [],
            fieldsTable: ['Index', { key: 'firstName', label: 'Prenume' },{ key: 'lastName', label: 'Nume'}, { key: 'email', label: 'Email'},{ key: 'role', label: 'Rol'}],
            currentPage: 1,
            perPageUsers: 20,
            iteration: 0
        }
    },
    methods: {
        getUsers() {
            let thisRef = this;
            this.iteration = (this.currentPage -1) * this.perPageUsers;
            if(this.isLoading !== true) {
              this.isLoading = true;
            }
            this.users = [];
            axios({
                method: "get",
                headers: {"accept":"application/json"},
                url: "http://localhost:3000/users/getAllUsers/" + this.iteration
            }).then(result => {
                console.log(result)
                if(result.data.length > 0) {
                  let user = {
                    idUser: 0,
                    firstName: "",
                    lastName: "",
                    email: "",
                    role: ""
                  }
                  for(var i = 0; i < result.data.length; i++) {
                    user = {
                      idUser: result.data[i].id_user,
                      firstName: result.data[i].first_name,
                      lastName: result.data[i].last_name,
                      email: result.data[i].email,
                      role: result.data[i].role
                    } 
                    this.users.push(user);                   
                  }
                  setTimeout(function() {
                    thisRef.isLoading = false;
                  }, 2000);
                }
            })
        },
        getUsersNumber() {
            let thisRef = this;
            axios({
                method: "get",
                headers: {"accept":"application/json"},
                url: "http://localhost:3000/users/getUsersNumber"
            }).then(result => {
                this.usersNumber = result.data[0].users_number;
                console.log("getUsersNumber", result)
            })
        }
    },
    mounted() {
        this.getUsers();
        this.getUsersNumber();
    }
  }
</script>

<style>
    .title-admin-component {
      text-align: left;
      font-size: 16px;
      font-weight: 600;
      color: #000000;
    }
    .small-element-title {
      color: #8a817c;
      font-weight: 500;
    }
    .sr-only {
      display: none !important;
    }
    .admin-users-component {
      padding: 30px;
    }
    .users-table th:first-child, .users-table th:nth-child(5) {
      width: 15% !important;
    }
    .users-table th:nth-child(2), .users-table th:nth-child(3) {
      width: 20% !important;
    }
    .users-table th:nth-child(4) {
      width: 30% !important;
    } 
    .table > :not(caption) > * > * {
      padding: 7px 20px !important;
      text-align: left !important;
    }
    .pagination-table {
      justify-content: flex-end;
      margin-top: 20px !important;
      padding-right: 0px;
    }
    .pagination-table .page-link {
      color: #000000 !important;
    }
    .pagination-table .page-item.active .page-link {
      color: #FFFFFF !important;
    }
    .pagination-table .page-item.active .page-link {
      background-color: #588157 !important;
      border-color: #3a5a40 !important;
    }
    .pagination-table .page-link:focus {
      box-shadow: 0 0 0 0.25rem rgb(88 129 87 / 20%) !important;
    }
</style>