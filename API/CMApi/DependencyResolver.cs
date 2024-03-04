namespace CMApi
{
    public class DependencyResolver
    {
        private readonly IServiceProvider _serviceProvider;

        public DependencyResolver(IServiceProvider serviceProvider)
        {
            _serviceProvider = serviceProvider;
        }

        public T GetService<T>()
        {
            var service = _serviceProvider.GetService<T>();

            if (service is null)
            {
                throw new NotImplementedException();
            }

            return service;    
        }
    }
}
