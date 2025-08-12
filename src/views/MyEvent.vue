<template>
  <div>
    <!-- Navbar -->

    <!-- Hero Section -->
    <section class="my-0 position-relative">
      <div class="shape shape-style-1 bg-gradient-hero">
        <span></span>
      </div>
      <div class="container pt-lg-md position-relative" style="z-index: 2">
        <div class="text-center text-white">
          <h2 class="font-weight-bold mb-3 text-white">Gérez vos évènements</h2>
          <p class="mb-0 text-white">
            Retrouvez ici la liste de vos évènements créés. Vous pouvez les
            modifier, les supprimer ou en créer de nouveaux pour mieux organiser
            vos activités.
          </p>
        </div>

        <!-- Grid of Cards -->
        <div class="row mt-3">
          <transition-group name="card-fade" tag="div" class="row w-100">
            <div
              v-for="item in items"
              :key="item.id"
              class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex align-items-stretch"
            >
              <div
                class="card event-card shadow-lg h-100 border-0 animate__animated animate__fadeInUp"
              >
                <div class="event-image-wrapper">
                  <a :href="`/my-event/${item.id}`">
                    <img
                      v-if="item.image"
                      :src="item.image"
                      class="card-img-top"
                      :alt="item.title"
                    />
                  </a>
                  <div
                    class="event-badge badge badge-pill badge-info"
                    v-if="item.badge"
                  >
                    {{ item.badge }}
                  </div>
                </div>
                <div class="card-body d-flex flex-column">
                  <h5 class="card-title font-weight-bold text-primary mb-2">
                    {{ item.title }}
                  </h5>
                  <p class="card-text flex-grow-1 text-muted">
                    {{ item.description }}
                  </p>
                  <a
                    href="#"
                    class="btn btn-gradient-primary btn-sm mt-auto align-self-start"
                  >
                    <i class="ni ni-curved-next mr-1"></i> Voir plus
                  </a>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
        <selected-event></selected-event>

        <!-- End Grid -->
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RequestService from "@/tools/requestService";
import API_ENDPOINTS from "@/tools/endPoints";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["currentUser"]),
    user() {
      return this.currentUser;
    },
  },
  data() {
    return {
      items: [
        {
          id: 1,
          title: "Conférence Tech 2024",
          description:
            "Participez à la conférence incontournable sur les nouvelles technologies et l'innovation.",
          image:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
          badge: "Nouveau",
        },
        {
          id: 2,
          title: "Atelier Design UX",
          description:
            "Un atelier pratique pour améliorer vos compétences en expérience utilisateur.",
          image:
            "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
          badge: "Populaire",
        },
        {
          id: 3,
          title: "Hackathon Étudiant",
          description:
            "Relevez des défis en équipe et développez des solutions innovantes en 48h.",
          image:
            "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=400&q=80",
        },
        {
          id: 4,
          title: "Webinar IA & Data",
          description:
            "Découvrez les dernières tendances en intelligence artificielle et data science.",
          image:
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        },
        {
          id: 5,
          title: "Meetup Entrepreneurs",
          description:
            "Rencontrez des entrepreneurs et développez votre réseau professionnel.",
          image:
            "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=400&q=80",
        },
        {
          id: 6,
          title: "Formation React",
          description:
            "Maîtrisez React.js avec des experts du domaine lors de cette formation intensive.",
          image:
            "https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=400&q=80",
        },
        {
          id: 7,
          title: "Soirée Networking",
          description:
            "Élargissez votre cercle professionnel dans une ambiance conviviale.",
          image:
            "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        },
        {
          id: 8,
          title: "Bootcamp Développeur",
          description:
            "Un bootcamp intensif pour devenir développeur web en quelques semaines.",
          image:
            "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=400&q=80",
        },
      ],
      selectedEvent: "",
      loading: false,
    };
  },
  mounted() {
    this.loadUserPhoto();
  },
  methods: {
    async loadUserPhoto() {
      // Defensive: only try to load if user exists and has an id
      if (this.user && this.user.id) {
        this.userPhoto =
          process.env.VUE_APP_BASE_URL +
          API_ENDPOINTS.USERS +
          "/" +
          this.user.id +
          "/" +
          "picture";
      } else {
        this.userPhoto = "";
      }
    },
    async createEvent() {
      console.log(this.eventForm);
      this.loading = true;
      try {
        const data = {
          name: this.eventForm.name,
          date: this.eventForm.date,
          location: this.eventForm.location,
        };
        console.log(data);

        // You may want to validate mobile (email or phone) here
        const response = await RequestService.createEvent(data);

        console.log(response);
        // this.$router.replace({ name: "home" }).catch(() => {});
        if (this.$toast && this.$toast.success) {
          this.$toast.success("Événement créé avec succès");
        }
      } catch (err) {
        if (err.response && err.response.data && err.response.data.message) {
          this.$toast.error(err.response.data.message);
        } else {
          this.$toast.error("Event creation failed. Please try again.");
        }
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style scoped>
@import "https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css";

.bg-gradient-navbar {
  background: linear-gradient(90deg, #5e72e4 0%, #825ee4 100%);
}
.bg-gradient-hero {
  background: linear-gradient(135deg, #5e72e4 0%, #825ee4 100%);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 1;
  overflow: hidden;
}
.shape-style-1 span {
  position: absolute;
  display: block;
  border-radius: 50%;
  opacity: 0.15;
  background: #fff;
}
.shape-style-1 span:nth-child(1) {
  width: 120px;
  height: 120px;
  left: 10%;
  top: 10%;
}
.shape-style-1 span:nth-child(2) {
  width: 80px;
  height: 80px;
  right: 15%;
  top: 20%;
}
.shape-style-1 span:nth-child(3) {
  width: 60px;
  height: 60px;
  left: 20%;
  bottom: 15%;
}
.shape-style-1 span:nth-child(4) {
  width: 100px;
  height: 100px;
  right: 10%;
  bottom: 10%;
}
.wave-svg {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  z-index: 2;
  pointer-events: none;
}
.display-3 {
  font-weight: 800;
  letter-spacing: -1px;
  text-shadow: 0 4px 24px rgba(0, 0, 0, 0.18);
}
.lead {
  font-size: 1.25rem;
}
.profile-card {
  max-width: 400px;
  background: #fff;
  border-radius: 1rem;
  margin-top: -30px;
  box-shadow: 0 8px 32px rgba(94, 114, 228, 0.12);
}
.event-card {
  border-radius: 1rem;
  background: #fff;
  transition: transform 0.18s cubic-bezier(0.4, 2, 0.3, 1), box-shadow 0.18s;
  box-shadow: 0 2px 12px rgba(94, 114, 228, 0.08);
  overflow: hidden;
  position: relative;
}
.event-card:hover {
  transform: translateY(-8px) scale(1.035);
  box-shadow: 0 8px 32px rgba(94, 114, 228, 0.18);
}
.event-image-wrapper {
  position: relative;
  width: 100%;
  height: 160px;
  overflow: hidden;
  background: #f8f9fe;
}
.card-img-top {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  transition: filter 0.2s;
}
.event-card:hover .card-img-top {
  filter: brightness(0.95) blur(1px);
}
.event-badge {
  position: absolute;
  top: 12px;
  left: 12px;
  background: linear-gradient(90deg, #5e72e4 0%, #825ee4 100%);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.35em 0.9em;
  border-radius: 1em;
  box-shadow: 0 2px 8px rgba(94, 114, 228, 0.12);
}
.btn-gradient-primary {
  background: linear-gradient(90deg, #5e72e4 0%, #825ee4 100%);
  color: #fff;
  border: none;
  transition: background 0.18s;
}
.btn-gradient-primary:hover,
.btn-gradient-primary:focus {
  background: linear-gradient(90deg, #825ee4 0%, #5e72e4 100%);
  color: #fff;
}
.card-title {
  font-size: 1.1rem;
}
.card-fade-enter-active,
.card-fade-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 2, 0.3, 1);
}
.card-fade-enter,
.card-fade-leave-to {
  opacity: 0;
  transform: translateY(30px) scale(0.98);
}
@media (max-width: 991.98px) {
  .profile-card {
    margin-top: 0;
  }
}
</style>
