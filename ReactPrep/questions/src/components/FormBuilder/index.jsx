import React, { useState } from 'react';
import './styles.css';

const FormBuilder = () => {
  const [fields, setFields] = useState([
    { id: 1, type: 'text', label: 'Full Name', placeholder: 'Enter your name', required: true, value: '' },
    { id: 2, type: 'email', label: 'Email', placeholder: 'Enter your email', required: true, value: '' },
    { id: 3, type: 'password', label: 'Password', placeholder: 'Enter password', required: true, value: '' },
  ]);

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const fieldTypes = ['text', 'email', 'password', 'number', 'checkbox', 'radio', 'select', 'textarea'];

  const addField = () => {
    const newField = {
      id: Date.now(),
      type: 'text',
      label: 'New Field',
      placeholder: 'Enter value',
      required: false,
      value: '',
      options: [],
    };
    setFields([...fields, newField]);
  };

  const removeField = (id) => {
    setFields(fields.filter(field => field.id !== id));
    const newErrors = { ...errors };
    delete newErrors[id];
    setErrors(newErrors);
  };

  const updateField = (id, key, value) => {
    setFields(fields.map(field =>
      field.id === id ? { ...field, [key]: value } : field
    ));
  };

  const handleInputChange = (id, value) => {
    updateField(id, 'value', value);
    // Clear error on input
    if (errors[id]) {
      setErrors({ ...errors, [id]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    fields.forEach(field => {
      if (field.required && !field.value) {
        newErrors[field.id] = `${field.label} is required`;
      } else if (field.type === 'email' && field.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(field.value)) {
          newErrors[field.id] = 'Please enter a valid email';
        }
      } else if (field.type === 'password' && field.value && field.value.length < 6) {
        newErrors[field.id] = 'Password must be at least 6 characters';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
      console.log('Form Data:', fields);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleReset = () => {
    setFields(fields.map(field => ({ ...field, value: '' })));
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div className="form-builder-container">
      <div className="form-builder-header">
        <h1>📋 Dynamic Form Builder</h1>
        <p>Create and manage forms with validation</p>
      </div>

      <form onSubmit={handleSubmit} className="dynamic-form">
        {fields.map((field) => (
          <div key={field.id} className="form-group">
            <div className="field-wrapper">
              {field.type === 'checkbox' ? (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={field.value === 'on'}
                    onChange={(e) => handleInputChange(field.id, e.target.checked ? 'on' : '')}
                    className="checkbox-input"
                  />
                  <span>{field.label}</span>
                  {field.required && <span className="required">*</span>}
                </label>
              ) : field.type === 'radio' ? (
                <div>
                  <label className="radio-label">
                    <span>
                      {field.label}
                      {field.required && <span className="required">*</span>}
                    </span>
                  </label>
                  <div className="radio-group">
                    {['Option 1', 'Option 2', 'Option 3'].map((option, idx) => (
                      <label key={idx} className="radio-option">
                        <input
                          type="radio"
                          name={`radio-${field.id}`}
                          value={option}
                          checked={field.value === option}
                          onChange={(e) => handleInputChange(field.id, e.target.value)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : field.type === 'select' ? (
                <div>
                  <label className="form-label">
                    {field.label}
                    {field.required && <span className="required">*</span>}
                  </label>
                  <select
                    value={field.value}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    className="form-input"
                  >
                    <option value="">-- Select an option --</option>
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </select>
                </div>
              ) : field.type === 'textarea' ? (
                <div>
                  <label className="form-label">
                    {field.label}
                    {field.required && <span className="required">*</span>}
                  </label>
                  <textarea
                    value={field.value}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="form-input textarea"
                    rows="4"
                  />
                </div>
              ) : (
                <div>
                  <label className="form-label">
                    {field.label}
                    {field.required && <span className="required">*</span>}
                  </label>
                  <input
                    type={field.type}
                    value={field.value}
                    onChange={(e) => handleInputChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                    className="form-input"
                  />
                </div>
              )}

              <button
                type="button"
                className="btn-remove"
                onClick={() => removeField(field.id)}
                title="Remove field"
              >
                ✕
              </button>
            </div>

            {errors[field.id] && (
              <div className="error-message">{errors[field.id]}</div>
            )}
          </div>
        ))}

        {submitted && (
          <div className="success-message">
            ✓ Form submitted successfully!
          </div>
        )}

        <div className="form-actions">
          <button type="button" className="btn btn-add" onClick={addField}>
            + Add Field
          </button>
          <button type="submit" className="btn btn-submit">
            Submit Form
          </button>
          <button type="button" className="btn btn-reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </form>

      {/* Field Editor - Show form structure */}
      <div className="field-inspector">
        <h3>📊 Form Structure</h3>
        <div className="field-list">
          {fields.map((field) => (
            <div key={field.id} className="field-item">
              <span className="field-type">{field.type}</span>
              <span className="field-label">{field.label}</span>
              {field.required && <span className="badge-required">Required</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormBuilder;
