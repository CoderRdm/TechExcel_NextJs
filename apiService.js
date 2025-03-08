// In your api service file (e.g., apiService.js)
export const deleteTemplate = async (templateId) => {
    try {
      const response = await fetch(`/api/deletetemplate/${templateId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for sending cookies if using session auth
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete template');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Error deleting template:', error);
      throw error;
    }
  };