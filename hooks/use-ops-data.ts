import { useState, useEffect } from 'react';
import { api } from '../lib/api-client';
import { Incident, Service, OnCallShift, DashboardMetrics } from '../lib/types';

export const useDashboardMetrics = () => {
  const [metrics, setMetrics] = useState<DashboardMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDashboardMetrics()
      .then(setMetrics)
      .finally(() => setLoading(false));
  }, []);

  return { metrics, loading };
};

export const useIncidents = () => {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIncidents = () => {
    setLoading(true);
    api.getIncidents()
      .then(setIncidents)
      .finally(() => setLoading(false));
  };

  const createIncident = async (data: Partial<Incident>) => {
    await api.createIncident(data);
    fetchIncidents(); // Refresh list
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  return { incidents, loading, createIncident };
};

export const useServices = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getServices()
      .then(setServices)
      .finally(() => setLoading(false));
  }, []);

  return { services, loading };
};

export const useOnCall = () => {
  const [shifts, setShifts] = useState<OnCallShift[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getOnCallSchedule()
      .then(setShifts)
      .finally(() => setLoading(false));
  }, []);

  return { shifts, loading };
};