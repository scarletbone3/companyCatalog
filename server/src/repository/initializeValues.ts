import { Repository } from '.';

export const initializeValues = async (): Promise<void> => {
    const Sony = await Repository.Company.create({ name: 'Sony' });
    const Microsoft = await Repository.Company.create({ name: 'Microsoft' });
    const Schecter = await Repository.Company.create({ name: 'Schecter' });

    const SonyJoe = await Repository.Contact.create({ name: 'Joe' });
    const SonyJoePhone = await Repository.ContactLine.create({ value: 'PhoneNumber: 88005553535' });
    const SonyJoeEmail = await Repository.ContactLine.create({ value: 'Email joe@gmail.com' });
    SonyJoe.setCompany(Sony);
    SonyJoe.setContactLines([SonyJoePhone, SonyJoeEmail]);

    const SonyBob = await Repository.Contact.create({ name: 'Bob' });
    const SonyBobPhone = await Repository.ContactLine.create({ value: 'PhoneNumber: 88005553535' });
    const SonyBobEmail = await Repository.ContactLine.create({ value: 'Email bob@gmail.com' });
    SonyBob.setCompany(Sony);
    SonyBob.setContactLines([SonyBobPhone, SonyBobEmail]);

    const MicrosoftAlissa = await Repository.Contact.create({ name: 'Alissa' });
    const MicrosoftAlissaPhone = await Repository.ContactLine.create({ value: 'PhoneNumber: 88005553535' });
    const MicrosoftAlissaEmail = await Repository.ContactLine.create({ value: 'Email alissa@gmail.com' });
    MicrosoftAlissa.setCompany(Microsoft);
    MicrosoftAlissa.setContactLines([MicrosoftAlissaPhone, MicrosoftAlissaEmail]);

    const SchecterSyn = await Repository.Contact.create({ name: 'Synyster Gates' });
    const SchecterSynPhone = await Repository.ContactLine.create({ value: 'PhoneNumber: 88005553535' });
    const SchecterSynEmail = await Repository.ContactLine.create({ value: 'Email synyster.a7x.gates@gmail.com' });
    SchecterSyn.setCompany(Schecter);
    SchecterSyn.setContactLines([SchecterSynPhone, SchecterSynEmail]);
}
