<template>
  <div>
    <!-- Navbar -->

    <!-- Hero Section -->
    <section class="section section-shaped section-lg my-0 position-relative">
      <div class="shape shape-style-1 bg-gradient-hero">
        <span></span>
      </div>
      <div class="container pt-lg-md position-relative" style="z-index: 2">
        <div class="row justify-content-center">
          <div class="col-lg-8 text-center">
            <h1
              class="display-3 text-white font-weight-bold mb-3 animate__animated animate__fadeInDown"
            >
              Bienvenue,
              <span v-if="user">{{ user.first_name || user.last_name }}</span> !
            </h1>

            <transition name="fade">
              <div
                v-if="user"
                class="card profile-card shadow-lg border-0 mb-4 mx-auto animate__animated animate__zoomIn"
              >
                <div class="card-body d-flex align-items-center">
                  <img
                    :src="
                      user.avatar ||
                      'https://ui-avatars.com/api/?name=' +
                        encodeURIComponent(
                          user.first_name || user.last_name || 'Utilisateur'
                        )
                    "
                    alt="Avatar"
                    class="rounded-circle mr-3"
                    style="
                      width: 64px;
                      height: 64px;
                      object-fit: cover;
                      border: 3px solid #fff;
                      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
                    "
                  />
                  <div>
                    <h5 class="card-title mb-1 text-primary">
                      {{ user.first_name || user.last_name || "Utilisateur" }}
                    </h5>
                    <p class="card-text mb-0 text-muted" v-if="user.email">
                      <i class="ni ni-email-83"></i> {{ user.email }}
                    </p>
                  </div>
                </div>
              </div>
            </transition>
          </div>
        </div>

        <!-- Grid of Cards -->
        <div class="row mt-5">
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
                  <img
                    v-if="item.image"
                    :src="item.image"
                    class="card-img-top"
                    :alt="item.title"
                  />
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
        <!-- End Grid -->
      </div>
      <!-- Decorative SVG Wave -->
      <svg class="wave-svg" viewBox="0 0 1440 120" preserveAspectRatio="none">
        <path
          d="M0,32L48,53.3C96,75,192,117,288,117.3C384,117,480,75,576,74.7C672,75,768,117,864,128C960,139,1056,117,1152,101.3C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          fill="#fff"
          fill-opacity="1"
        ></path>
      </svg>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RequestService from "@/tools/requestService";

export default {
  name: "Home",
  computed: {
    ...mapGetters(["currentUser"]),
    user() {
      return this.currentUser;
    },
    defaultAvatar() {
      // fallback avatar for navbar if userPhoto is not loaded
      if (this.user && (this.user.first_name || this.user.last_name)) {
        return (
          "https://ui-avatars.com/api/?name=" +
          encodeURIComponent(this.user.first_name || this.user.last_name)
        );
      }
      return "https://ui-avatars.com/api/?name=Profil";
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
      userPhoto: "",
    };
  },
  mounted() {
    this.loadUserPhoto();
  },
  methods: {
    async loadUserPhoto() {
      // Defensive: only try to load if user exists and has an id
      if (this.user && this.user.id) {
        try {
          const response = await RequestService.userPicture(this.user.id);
          this.userPhoto = response;
        } catch (e) {
          // fallback to default avatar if error
          this.userPhoto = "";
        }
      } else {
        this.userPhoto = "";
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
