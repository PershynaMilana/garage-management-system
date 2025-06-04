import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faUserPlus,
  faUser,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { User } from "../../types/user.ts";

interface RegisterUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegister: (userData: Partial<User>) => void;
}

const RegisterUserModal: React.FC<RegisterUserModalProps> = ({
                                                               isOpen,
                                                               onClose,
                                                               onRegister,
                                                             }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    role: "Default member" as User["role"],
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (!isOpen) return null;

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = t('garageManagement.registerModal.validation.nameRequired');
    }

    if (!formData.email.trim()) {
      newErrors.email = t('garageManagement.registerModal.validation.emailRequired');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('garageManagement.registerModal.validation.emailInvalid');
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t('garageManagement.registerModal.validation.phoneRequired');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser: Partial<User> = {
        ...formData,
        garageNumber: "-",
        personalDebt: 0,
        avatar: `https://images.unsplash.com/photo-${Date.now()}?w=40&h=40&fit=crop&crop=face`,
        registrationDate: new Date().toISOString().split("T")[0],
        lastActivity: new Date().toISOString().split("T")[0],
      };
      onRegister(newUser);
      setFormData({
        name: "",
        email: "",
        phone: "",
        role: "Default member",
      });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  return (
      <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
      >
        <div
            className="bg-[#2a3f5f] rounded-lg border border-[#4e6b8c]/30 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#4e6b8c]/30">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-[#22d3ee]/20 rounded-lg">
                <FontAwesomeIcon icon={faUserPlus} className="text-[#22d3ee]" />
              </div>
              <h2 className="text-xl font-semibold text-white">
                {t('garageManagement.registerModal.title')}
              </h2>
            </div>
            <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
            >
              <FontAwesomeIcon icon={faTimes} className="text-xl" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-white font-medium mb-2">
                <FontAwesomeIcon icon={faUser} className="mr-2 text-[#22d3ee]" />
                {t('garageManagement.registerModal.fullName')}
              </label>
              <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className={`w-full px-4 py-3 bg-[#1a2332] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22d3ee] ${
                      errors.name ? "border-red-500" : "border-[#4e6b8c]/30"
                  }`}
                  placeholder={t('garageManagement.registerModal.enterFullName')}
              />
              {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-white font-medium mb-2">
                <FontAwesomeIcon
                    icon={faEnvelope}
                    className="mr-2 text-[#22d3ee]"
                />
                {t('garageManagement.registerModal.email')}
              </label>
              <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 bg-[#1a2332] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22d3ee] ${
                      errors.email ? "border-red-500" : "border-[#4e6b8c]/30"
                  }`}
                  placeholder="example@email.com"
              />
              {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="block text-white font-medium mb-2">
                <FontAwesomeIcon icon={faPhone} className="mr-2 text-[#22d3ee]" />
                {t('garageManagement.registerModal.phone')}
              </label>
              <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full px-4 py-3 bg-[#1a2332] border rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#22d3ee] ${
                      errors.phone ? "border-red-500" : "border-[#4e6b8c]/30"
                  }`}
                  placeholder="+1 234 567 8900"
              />
              {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Role */}
            <div>
              <label className="block text-white font-medium mb-2">
                {t('garageManagement.registerModal.role')}
              </label>
              <select
                  value={formData.role}
                  onChange={(e) =>
                      handleInputChange("role", e.target.value as User["role"])
                  }
                  className="w-full px-4 py-3 bg-[#1a2332] border border-[#4e6b8c]/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#22d3ee]"
              >
                <option value="Default member">{t('userManagement.roles.defaultMember')}</option>
                <option value="Manager">{t('userManagement.roles.manager')}</option>
                <option value="Admin">{t('userManagement.roles.admin')}</option>
              </select>
            </div>

            {/* Action buttons */}
            <div className="flex gap-3 pt-4">
              <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
              >
                {t('garageManagement.registerModal.cancel')}
              </button>
              <button
                  type="submit"
                  className="flex-1 px-4 py-3 bg-emerald-600/80 hover:bg-emerald-700/90 text-white rounded-lg transition-colors"
              >
                {t('garageManagement.registerModal.register')}
              </button>
            </div>
          </form>
        </div>
      </div>
  );
};

export default RegisterUserModal;