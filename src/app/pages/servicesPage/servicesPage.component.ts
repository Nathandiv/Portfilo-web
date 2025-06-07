import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import * as AOS from 'aos';
import { NavbarComponent } from '../../Shared-Ui/navbar/navbar.component';
import { FooterComponent } from '../../Shared-Ui/footer/footer.component';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  hook: string;
  features: string[];
  usp: string;
  icon: string;
  color: string;
}

interface TechStack {
  name: string;
  category: string;
  logo: string;
}

interface WorkStep {
  step: number;
  title: string;
  description: string;
  icon: string;
}

interface QuoteForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  serviceId: string;
  projectDescription: string;
  timeline: string;
  budget: string;
  additionalNotes: string;
}

interface ConsultationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  projectDescription: string;
  timeline: string;
  preferredContactMethod: string;
  additionalNotes: string;
}

@Component({
  selector: 'app-services-page',
  standalone: true,
  imports: [CommonModule, FormsModule,NavbarComponent,FooterComponent],
  templateUrl: './servicesPage.component.html',
  styleUrls: ['./servicesPage.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ServicesPageComponent implements OnInit, OnDestroy {
  showQuoteModal: boolean = false;
  showConsultationModal: boolean = false;
  isSubmitting: boolean = false;
  isSubmittingConsultation: boolean = false;
  selectedFiles: File[] = [];
  selectedConsultationFiles: File[] = [];

  quoteForm: QuoteForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    serviceId: '',
    projectDescription: '',
    timeline: '',
    budget: '',
    additionalNotes: ''
  };

  consultationForm: ConsultationForm = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: '',
    projectDescription: '',
    timeline: '',
    preferredContactMethod: 'email',
    additionalNotes: ''
  };

  services: Service[] = [
    {
      id: 'end-to-end',
      title: 'End-to-End Web & Mobile Application Development',
      subtitle: 'Bringing Your Digital Vision to Life, From Idea to Launch',
      hook: 'From concept to deployment, we craft powerful web and mobile applications that engage users and drive business growth. We handle every step, so you can focus on your vision.',
      features: [
        'Full lifecycle development: Discovery, design, development, testing, deployment',
        'Cross-platform compatibility (iOS, Android, Web)',
        'Scalable architectures for future growth',
        'User-centered design principles for intuitive experiences',
        'Agile development methodology for faster delivery'
      ],
      usp: 'Our end-to-end approach means you have a single, reliable partner for your entire digital journey, from ideation to post-launch support.',
      icon: '🚀',
      color: 'primary'
    },
    {
      id: 'systems',
      title: 'Systems Applications Development',
      subtitle: 'Tailored Software Solutions for Your Business Challenges',
      hook: 'Transform your business operations with custom software solutions designed specifically for your unique workflows and requirements.',
      features: [
        'Custom CRM, ERP, and internal tools development',
        'Integration with existing systems and third-party APIs',
        'Process automation and efficiency improvements',
        'Robust security protocols and data integrity',
        'Scalable enterprise-grade solutions'
      ],
      usp: 'We don\'t just build software; we engineer solutions that seamlessly integrate with your business processes and scale with your growth.',
      icon: '⚙️',
      color: 'secondary'
    },
    {
      id: 'backend',
      title: 'Back-End Development',
      subtitle: 'The Robust Engine Powering Your Digital Success',
      hook: 'A strong back-end is the invisible backbone of any successful application. We build secure, scalable, and high-performance server-side solutions that empower your front-end.',
      features: [
        'API development (RESTful, GraphQL)',
        'Database design and optimization (SQL, NoSQL)',
        'Cloud infrastructure management (Local SA hosting)',
        'Microservices architecture and serverless computing',
        'Authentication and authorization systems'
      ],
      usp: 'With expertise in cutting-edge technologies and a commitment to performance, we ensure your back-end is not just functional, but a competitive advantage.',
      icon: '⚡',
      color: 'accent'
    },
    {
      id: 'frontend',
      title: 'Front-End Development',
      subtitle: 'Captivating User Experiences That Drive Engagement',
      hook: 'Create stunning, intuitive interfaces that your users will love. We combine beautiful design with seamless functionality to deliver exceptional user experiences.',
      features: [
        'Responsive and intuitive UI/UX design',
        'Modern JavaScript frameworks (React, Angular, Vue.js)',
        'Pixel-perfect implementation from design mockups',
        'Optimized performance for fast loading times',
        'Accessibility (WCAG) compliance'
      ],
      usp: 'We craft front-end experiences that not only look beautiful but also convert visitors into loyal customers through thoughtful user experience design.',
      icon: '🎨',
      color: 'primary'
    },
    {
      id: 'maintenance',
      title: 'Maintenance & Support',
      subtitle: 'Ensuring Your Applications Run Flawlessly, 24/7',
      hook: 'Keep your applications running at peak performance with our comprehensive maintenance and support services. Peace of mind through ongoing excellence.',
      features: [
        '24/7 monitoring and issue resolution',
        'Regular security updates and vulnerability patching',
        'Performance optimization and bug fixes',
        'Feature enhancements and technical debt reduction',
        'Version control and backup management'
      ],
      usp: 'Our proactive approach to maintenance means issues are resolved before they impact your users, ensuring maximum uptime and performance.',
      icon: '🛡️',
      color: 'secondary'
    },
    {
      id: 'devops',
      title: 'DevOps Consulting & Implementation',
      subtitle: 'Accelerating Your Development Cycles, Delivering Faster & Smarter',
      hook: 'Streamline your development process and accelerate time-to-market with our expert DevOps consulting and implementation services.',
      features: [
        'CI/CD pipeline setup and automation',
        'Infrastructure as Code (IaC) implementation',
        'Containerization (Docker, Kubernetes)',
        'Local cloud migration strategies',
        'Monitoring and logging solutions'
      ],
      usp: 'We don\'t just implement DevOps; we integrate it into your culture, fostering collaboration and efficiency that transforms your entire development lifecycle.',
      icon: '🔄',
      color: 'accent'
    },
    {
      id: 'consultations',
      title: 'Consultations & Strategy',
      subtitle: 'Expert Guidance to Navigate Your Digital Journey',
      hook: 'Make informed decisions with expert technical guidance. Our strategic consultations help you choose the right technologies and approaches for your goals.',
      features: [
        'Technology stack recommendations',
        'Project feasibility studies and scope definition',
        'Technical due diligence and auditing',
        'Digital transformation roadmaps',
        'Architectural design and planning'
      ],
      usp: 'With years of experience across diverse industries in South Africa, we provide strategic insights that help you avoid costly mistakes and accelerate your success.',
      icon: '💡',
      color: 'primary'
    }
  ];

  techStack: TechStack[] = [
    { name: 'React', category: 'Frontend', logo: '⚛️' },
    { name: 'Angular', category: 'Frontend', logo: '🅰️' },
    { name: 'Node.js', category: 'Backend', logo: '💚' },
    { name: 'Java', category: 'Backend', logo: '☕' },
    { name: 'Spring Boot', category: 'Framework', logo: '🍃' },
    { name: 'JavaScript', category: 'Language', logo: '📜' },
    { name: 'TypeScript', category: 'Language', logo: '📘' },
    { name: 'MySQL', category: 'Database', logo: '🐬' }
  ];

  workSteps: WorkStep[] = [
    {
      step: 1,
      title: 'Discovery',
      description: 'We dive deep into understanding your business goals, user needs, and technical requirements.',
      icon: '🔍'
    },
    {
      step: 2,
      title: 'Design',
      description: 'Create intuitive user experiences and robust technical architectures that align with your vision.',
      icon: '🎨'
    },
    {
      step: 3,
      title: 'Develop',
      description: 'Build your solution using agile methodology with regular updates and transparent communication.',
      icon: '⚡'
    },
    {
      step: 4,
      title: 'Deploy',
      description: 'Launch your application with comprehensive testing and seamless deployment processes.',
      icon: '🚀'
    },
    {
      step: 5,
      title: 'Support',
      description: 'Provide ongoing maintenance, updates, and optimization to ensure long-term success.',
      icon: '🛡️'
    }
  ];

  ngOnInit(): void {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100
    });
  }

  ngOnDestroy(): void {
    AOS.refresh();
  }

  scrollToContact(): void {
    // Implement scroll to contact section
    console.log('Scroll to contact');
  }

  openQuoteModal(serviceId: string): void {
    this.quoteForm.serviceId = serviceId;
    this.showQuoteModal = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeQuoteModal(): void {
    this.showQuoteModal = false;
    this.resetForm();
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  openConsultationModal(): void {
    this.showConsultationModal = true;
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
  }

  closeConsultationModal(): void {
    this.showConsultationModal = false;
    this.resetConsultationForm();
    // Restore body scroll
    document.body.style.overflow = 'auto';
  }

  onFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    const maxSize = 10 * 1024 * 1024; // 10MB

    files.forEach(file => {
      if (file.size <= maxSize) {
        this.selectedFiles.push(file);
      } else {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
      }
    });

    // Clear the input
    event.target.value = '';
  }

  onConsultationFileSelected(event: any): void {
    const files = Array.from(event.target.files) as File[];
    const maxSize = 10 * 1024 * 1024; // 10MB

    files.forEach(file => {
      if (file.size <= maxSize) {
        this.selectedConsultationFiles.push(file);
      } else {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
      }
    });

    // Clear the input
    event.target.value = '';
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);
  }

  removeConsultationFile(index: number): void {
    this.selectedConsultationFiles.splice(index, 1);
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  submitQuote(): void {
    if (!this.isFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    this.isSubmitting = true;

    // Simulate form submission
    setTimeout(() => {
      console.log('Quote form submitted:', {
        ...this.quoteForm,
        files: this.selectedFiles.map(f => ({ name: f.name, size: f.size }))
      });
      
      alert('Thank you! Your quote request has been submitted. We\'ll get back to you within 24 hours.');
      this.closeQuoteModal();
      this.isSubmitting = false;
    }, 2000);
  }

  submitConsultation(): void {
    if (!this.isConsultationFormValid()) {
      alert('Please fill in all required fields.');
      return;
    }

    this.isSubmittingConsultation = true;

    // Simulate form submission
    setTimeout(() => {
      console.log('Consultation form submitted:', {
        ...this.consultationForm,
        files: this.selectedConsultationFiles.map(f => ({ name: f.name, size: f.size }))
      });
      
      alert('Thank you! Your consultation request has been submitted. We\'ll contact you within 24 hours to schedule your free consultation.');
      this.closeConsultationModal();
      this.isSubmittingConsultation = false;
    }, 2000);
  }

  private isFormValid(): boolean {
    return !!(
      this.quoteForm.firstName &&
      this.quoteForm.lastName &&
      this.quoteForm.email &&
      this.quoteForm.serviceId &&
      this.quoteForm.projectDescription
    );
  }

  private isConsultationFormValid(): boolean {
    return !!(
      this.consultationForm.firstName &&
      this.consultationForm.lastName &&
      this.consultationForm.email &&
      this.consultationForm.projectDescription
    );
  }

  private resetForm(): void {
    this.quoteForm = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      serviceId: '',
      projectDescription: '',
      timeline: '',
      budget: '',
      additionalNotes: ''
    };
    this.selectedFiles = [];
  }

  private resetConsultationForm(): void {
    this.consultationForm = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      company: '',
      projectType: '',
      projectDescription: '',
      timeline: '',
      preferredContactMethod: 'email',
      additionalNotes: ''
    };
    this.selectedConsultationFiles = [];
  }

  getServiceDetails(serviceId: string): void {
    // Implement navigation to service detail page or modal
    console.log('Get details for service:', serviceId);
  }

  requestQuote(serviceId: string): void {
    this.openQuoteModal(serviceId);
  }

  getColorClasses(color: string): string {
    const colorMap: {[key: string]: string} = {
      'primary': 'from-gray-800 to-black',
      'secondary': 'from-gray-700 to-gray-900',
      'accent': 'from-gray-600 to-gray-800'
    };
    return colorMap[color] || colorMap['primary'];
  }

  getBorderColorClass(color: string): string {
    const colorMap: {[key: string]: string} = {
      'primary': 'border-gray-200 hover:border-gray-400',
      'secondary': 'border-gray-200 hover:border-gray-400',
      'accent': 'border-gray-200 hover:border-gray-400'
    };
    return colorMap[color] || colorMap['primary'];
  }

  getButtonColorClass(color: string): string {
    const colorMap: {[key: string]: string} = {
      'primary': 'bg-black hover:bg-gray-800 focus:ring-gray-500',
      'secondary': 'bg-black hover:bg-gray-800 focus:ring-gray-500',
      'accent': 'bg-black hover:bg-gray-800 focus:ring-gray-500'
    };
    return colorMap[color] || colorMap['primary'];
  }
}